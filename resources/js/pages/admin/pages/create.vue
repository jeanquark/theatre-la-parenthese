<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans" class="navigation">
                <font-awesome-icon icon="file-alt" />
                <span>Plans</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="text-center">Ajouter une nouvelle page</h2>

        <b-form @submit.prevent="addNewPage">
            <b-row align-v="center" class="justify-content-start my-3 px-3">
                <b-col cols="12" md="6">
                    <b-form-group label="Entrer un titre pour cette page:" label-for="newPageTitle">
                        <b-form-input id="newPageTitle" placeholder="Titre de la page" v-model="newPage.title"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label="Contenu de la page:" label-for="newPageContent">
                        <ckeditor v-model="newPage['content']" :config="editorConfig"></ckeditor>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="justify-content-center my-2">
                <b-button variant="primary" :disabled="loading" type="submit">
                    <b-spinner small type="grow" v-if="loading"></b-spinner>
                    Créer nouvelle page
                </b-button>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import CKEditor from 'ckeditor4-vue'

export default {
    components: {
        ckeditor: CKEditor.component
    },
    async created() {},
    data() {
        return {
            editorConfig: {
                extraPlugins: ['justify', 'image2'],
                filebrowserBrowseUrl: '/ckfinder/browser',
                filebrowserUploadUrl: '/userfiles'
            },
            newPage: {}
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        }
    },
    methods: {
        async addNewPage() {
            try {
                this.$store.commit('loading/SET_LOADING', true)
                await this.$store.dispatch('pages/createPage', { newPage: this.newPage })
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Nouvelle page créée avec succès!')
                this.$router.push('/admin/pages')
            } catch (error) {
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.error("Une erreur est survenue et la nouvelle page n'a pas pu être créée.")
            }
        }
    }
}
</script>

<style scoped></style>
