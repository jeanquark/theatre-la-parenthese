<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/pages" class="navigation">
                <font-awesome-icon icon="file-alt" />
                <span>Pages</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="text-center mb-3">Editer le contenu de la page <span class="primary-color" v-if="page">"{{ page.title }}"</span>:</h2>

        <!-- pages: {{ pages }}<br /><br /> -->
		<!-- page: {{ page }}<br /><br /> -->
        <!-- updatedPage: {{ updatedPage }}<br /><br /> -->
        <!-- editorData: {{ editorData }}<br /><br /> -->
        <!-- <ckeditor v-model="editorData" :config="editorConfig"></ckeditor> -->
        <ckeditor :config="editorConfig" v-if="updatedPage && updatedPage['content']" class="" v-model="updatedPage['content']"></ckeditor>
        <b-row class="justify-content-center my-2">
            <b-button variant="primary" :disabled="loading" @click="updatePage">
                <b-spinner small type="grow" v-if="loading"></b-spinner>
                Editer le contenu
            </b-button>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
import CKEditor from 'ckeditor4-vue'
export default {
    components: {
        // Use the <ckeditor> component in this view.
        ckeditor: CKEditor.component
    },
    async created() {
        const pageSlug = this.$route.params.id
        this.pageSlug = pageSlug
        console.log('pageSlug: ', pageSlug)

        if (!this.$store.getters['pages/pages'][pageSlug]) {
            await this.$store.dispatch('pages/fetchPageBySlug', pageSlug)
        }
    },
    mounted() {
        this.updatedPage = {
            slug: this.pageSlug,
            title: this.page ? this.page['title'] : '',
            content: this.page ? this.page['content'] : ''
        }
    },
    data() {
        return {
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // extraPlugins: ['justify', 'image', 'image2'],
                extraPlugins: ['justify', 'image2'],
                // filebrowserBrowseUrl: '/browser/browse.php',
                // filebrowserUploadUrl: '/uploader/upload.php',
                // filebrowserBrowseUrl: '/js/ckfinder/ckfinder.html',
                // filebrowserBrowseUrl: '/ckfinder/browser?token=123',
                filebrowserBrowseUrl: '/ckfinder/browser',
                // filebrowserBrowseUrl: '/images',
                // filebrowserUploadUrl: '/js/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files'
                filebrowserUploadUrl: '/userfiles'
                // filebrowserImageUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images'
                // allowedContent: 'h1 h2 h3 h4 h5 h6 p blockquote strong em a[!href] img(left,right)[!src,alt,width,height]'
                // extraAllowedContent: 'img'
            },
            updatedPage: {},
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        pages() {
            return this.$store.getters['pages/pages']
        },
        // page: {
        //     get: function() {
        //         return JSON.parse(JSON.stringify(this.$store.getters['pages/pages'][this.pageSlug]))
        //     }
        // },
        // page () {
        //     if (this.$store.getters['pages/pages'][this.pageSlug]) {
        //         return JSON.parse(JSON.stringify(this.$store.getters['pages/pages'][this.pageSlug]))
        //     }
        // },
        page () {
            return this.$store.getters['pages/pages'][this.pageSlug]
        },
        // updatedPage: {
        //     get: function() {
        //         // if (this.$store.getters['pages/pages'][this.pageSlug]) {
        //         //     return JSON.parse(JSON.stringify(this.$store.getters['pages/pages'][this.pageSlug]))
        //         // }
        //         return {...this.$store.getters['pages/pages'][this.pageSlug]}
        //     },
        //     set: function(newValue) {
        //         console.log('newValue: ', newValue)
        //     }
        // },
        // updatedPage () {
        //     // return { ...this.$store.getters['pages/pages'][this.pageSlug] }
        //     if (this.$store.getters['pages/pages'][this.pageSlug]) {
        //         return JSON.parse(JSON.stringify(this.$store.getters['pages/pages'][this.pageSlug]))
        //     }
        // },
        // updatedPage () {
        //     return Object.assign({}, this.$store.getters['pages/pages'][this.pageSlug])
        // }
    },
    methods: {
        async updatePage() {
            try {
                console.log('updatePage: ', this.updatedPage)
                this.$store.commit('loading/SET_LOADING', true)
                await this.$store.dispatch('pages/updatePage', this.updatedPage)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Contenu mis à jour avec succès.')
                this.$router.push('/admin/pages')
            } catch (error) {
                console.log('error: ', error)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.error("Une erreur est survenue et le contenu n'a pas pu être mis à jour.")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './resources/sass/_variables.scss';
	.primary-color {
		color: $primary;
	}
</style>