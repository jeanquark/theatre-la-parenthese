<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/pages" class="navigation">
                <font-awesome-icon icon="file-alt" />
                <span>Pages</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="text-center mb-3">
            Editer la page <span class="primary-color" v-if="page">"{{ page.name }}"</span>
        </h2>

        <!-- pages: {{ pages }}<br /><br /> -->
        <!-- page: {{ page }}<br /><br /> -->
        <!-- updatedPage: {{ updatedPage }}<br /><br /> -->
        <!-- showHTML: {{ showHTML }}<br /><br /> -->
        <!-- editorData: {{ editorData }}<br /><br /> -->
        <!-- <ckeditor v-model="editorData" :config="editorConfig"></ckeditor> -->
        <b-form @submit.prevent="updatePage">
            <b-col cols="12">
                <b-form-group label="Titre:" label-for="name">
                    <b-form-input id="name" name="name" :class="{ 'is-invalid': form.errors.has('name') }" v-model="form.name"></b-form-input>
                    <has-error :form="form" field="name" />
                </b-form-group>
            </b-col>

            <b-col cols="12" class="my-2">
                <b-form-checkbox id="is_published" name="is_published" value="1" unchecked-value="0" v-model="form.is_published">
                    Publié?
                </b-form-checkbox>
            </b-col>

            <b-row align-v="center" class="justify-content-start my-3 px-3">
                <b-col cols="12" v-if="page">
                    <text-editor @toggleShowHTML="toggleShowHTML" :formContent="page.content" />
                </b-col>
            </b-row>
        </b-form>

        <b-row class="justify-content-center my-2">
            <b-button variant="primary" :disabled="loading" @click="updatePage">
                <b-spinner small type="grow" v-if="loading"></b-spinner>
                Editer le contenu
            </b-button>
        </b-row>
        <b-row class="justify-content-center">
            <b-alert variant="danger" dismissible :show="form.errors.any()">Erreur lors de l'envoi. Veuillez vérifier la validité des champs.</b-alert>
        </b-row>
    </b-container>
</template>

<script>
import Form from 'vform'
// import CKEditor from 'ckeditor4-vue'
import TextEditor from '~/components/TextEditor'
export default {
    components: {
        // Use the <ckeditor> component in this view.
        // ckeditor: CKEditor.component,
        TextEditor
    },
    async created() {
        if (!this.$store.getters['pages/pages'][this.$route.params.id]) {
            await this.$store.dispatch('pages/fetchPageById', { pageId: this.$route.params.id })
        }

        // console.log('this.page: ', this.page)
        // console.log('this.form: ', this.form)
        this.form.fill(this.page)
    },
    mounted() {
    },
    data() {
        return {
            // editorData: '<p>Content of the editor.</p>',
            // editorConfig: {
            //     extraPlugins: ['justify', 'image2'],
            //     filebrowserBrowseUrl: '/ckfinder/browser',
            //     filebrowserUploadUrl: '/userfiles'
            // },
            showHTML: false,
            form: new Form({
                id: '',
                name: '',
                content: '',
                is_published: false
            })
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        pages() {
            return this.$store.getters['pages/pages']
        },
        page() {
            return this.$store.getters['pages/pages'][this.$route.params.id]
        }
    },
    methods: {
        toggleShowHTML (value) {
            this.showHTML = value
        },
        async updatePage() {
            try {
                console.log('updatePage: ', this.form)
                this.$store.commit('loading/SET_LOADING', true)

                let content
                if (!this.showHTML) {
                    content = document.getElementById('textBox').innerHTML
                } else {
                    content = document.getElementById('textBox').innerText
                }
                console.log('content: ', content)

                this.form['content'] = content
                console.log('this.form: ', this.form)

                await this.$store.dispatch('pages/updatePage', this.form)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Page mise à jour avec succès!')
                this.$router.push('/admin/pages')
            } catch (error) {
                this.$store.commit('loading/SET_LOADING', false)
                console.log('error: ', error)
                this.$noty.error("Une erreur est survenue et la page n'a pas pu être mise à jour.")
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
