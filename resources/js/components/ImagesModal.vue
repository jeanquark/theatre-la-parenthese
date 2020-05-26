<template>
    <b-modal size="xl" id="imagesModal" ok-disabled no-close-on-esc no-close-on-backdrop @close="closeModal">
        <template v-slot:modal-title>
            <span class="unselectable">Gestion des images</span>
        </template>
        <!-- loading: {{ loading }}<br /><br /> -->
        <!-- showSidebar: {{ showSidebar }}<br /><br /> -->
        <!-- selectedFolder: {{ selectedFolder }}<br /><br /> -->
        <!-- folders: {{ folders }}<br /><br /> -->
        <!-- path: {{ path }}<br /><br /> -->
        <!-- currentPath: {{ currentPath }}<br /><br /> -->
        <!-- selectedFile: {{ selectedFile }}<br /><br /> -->

        <b-tabs content-class="mt-3" v-model="tabIndex">
            <b-tab title="Gallerie d'images" active>
                <!-- Tab image gallery -->
                <b-sidebar aria-controls="details" shadow v-model="showSidebar">
                    <template v-slot:title class="">
                        <div class="text-center unselectable">
                            <h3 class="">Détails</h3>
                        </div>
                    </template>
                    <div class="px-3 py-2 unselectable" v-if="selectedFile">
                        <b-img :src="`/images/${selectedFile[0]}`" fluid thumbnail ref="selectedImage" class="mb-3" @load="onImageLoad"></b-img>
                        <p class="text-dark">
                            Taille: <b>{{ selectedFile[2] / 1000 }} Ko</b><br />
                            Dernière modification: <b>{{ selectedFile[3] | moment('DD-MM-YYYY HH:mm') }}</b
                            ><br />
                            Largeur: <b>{{ selectedImageWidth }} px</b><br />
                            Hauteur: <b>{{ selectedImageHeight }} px</b>
                        </p>

                        <div class="text-center">
                            <b-button variant="primary" class="my-2" @click="insertImage(selectedFile[0])">Insérer Image</b-button><br />
                            <b-button variant="danger" size="sm" @click="deleteImage(selectedFile[0])">Supprimer</b-button>
                        </div>
                    </div>
                    <div class="px-3 py-2" v-if="selectedFolder">
                        <b-img src="/images/icons/folder.png" fluid class=""></b-img>
                        <p class="text-dark text-center" style="word-break: break-word;">
                            {{ selectedFolder }}
                        </p>
                        <div class="text-center">
                            <b-button variant="danger" size="sm" @click="deleteFolder">Supprimer</b-button>
                        </div>
                    </div>
                    <template v-slot:footer="{ hide }">
                        <div class="d-flex bg-dark text-light justify-content-center align-items-center px-3 py-2">
                            <b-button size="sm" @click="hide">Fermer</b-button>
                        </div>
                    </template>
                </b-sidebar>
                <b-row class="justify-content-start my-3">
                    <b-col cols="12">
                        <b-breadcrumb>
                            <b-breadcrumb-item v-for="(item, index) in path" :key="`breadcrumb_${index}`" :active="item.active" @click="navigateToFolder(item.folder)">{{
                                item.name
                            }}</b-breadcrumb-item>
                        </b-breadcrumb>
                    </b-col>
                </b-row>
                <b-row class="justify-content-start my-3" v-if="!loading">
                    <b-col cols="6" md="3" lg="2" v-for="(folder, index) of folders" :key="`folder_${index}`" @click="handleClick(folder)">
                        <b-img fluid src="/images/icons/folder.png" class="folder"></b-img>
                        <p class="text-center" style="word-break: break-word;">{{ formatFileName(folder) }}</p>
                    </b-col>
                    <b-col cols="6" md="3" lg="2" v-for="(file, index) of files" :key="`file_${index}`" @click="selectFile(file)">
                        <b-img thumbnail fluid :src="`/images/${file[0]}`" class="image"></b-img>
                        <p class="text-center" style="word-break: break-word;">{{ formatFileName(file[0]) }}</p>
                    </b-col>
                </b-row>
                <b-row align-v="center" class="justify-content-center" style="height: 15em;" v-else>
                    <b-spinner type="grow" label="Loading..."></b-spinner>
                </b-row>
            </b-tab>
            <b-tab title="Uploader une image"
                ><!-- Tab upload image -->
                <b-row class="justify-content-start my-3">
                    <b-col cols="12">
                        <b-breadcrumb>
                            <b-breadcrumb-item v-for="(item, index) in path" :key="`breadcrumb_${index}`" :active="item.active" @click="navigateToFolder(item.folder)">{{
                                item.name
                            }}</b-breadcrumb-item>
                        </b-breadcrumb>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center my-3">
                    <b-col cols="12" md="6" lg="4">
                        <b-form-file
                            accept=".jpg, .png, .gif"
                            placeholder="Choisir un fichier..."
                            drop-placeholder="Placer le fichier ici..."
                            :class="{ 'is-invalid': formNewImage.errors.has('image') }"
                            @change="onFileChange"
                        ></b-form-file>
                        <has-error :form="formNewImage" field="image" />
                        <div id="preview">
                            <img v-if="url" :src="url" />
                        </div>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center my-3">
                    <b-button variant="dark" size="sm" class="mx-2" @click="clearFileInput">Effacer</b-button>
                    <b-button variant="primary" @click.prevent="uploadImage">Uploader</b-button>
                </b-row>
            </b-tab>
            <b-tab title="Ajouter dossier"
                ><!-- Tab Add folder -->
                <b-row class="justify-content-start my-3">
                    <b-col cols="12">
                        <b-breadcrumb>
                            <b-breadcrumb-item v-for="(item, index) in path" :key="`breadcrumb_${index}`" :active="item.active" @click="navigateToFolder(item.folder)">{{
                                item.name
                            }}</b-breadcrumb-item>
                        </b-breadcrumb>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center my-3">
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Nom du dossier:" label-for="name">
                            <b-form-input id="folderName" name="name" :class="{ 'is-invalid': formNewFolder.errors.has('name') }" v-model="formNewFolder.name"></b-form-input>
                            <has-error :form="formNewFolder" field="name" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center my-3">
                    <b-button variant="primary" @click.prevent="createNewFolder">Créer dossier</b-button>
                </b-row>
            </b-tab>
        </b-tabs>
        <template v-slot:modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="md" class="float-right" @click="closeModal">
                    Fermer
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import { objectToFormData } from 'object-to-formdata'
export default {
    async created() {},
    async mounted() {
        try {
            this.$store.commit('loading/SET_LOADING', true)
            console.log('FilesModal mounted!')
            const { data } = await axios.get('/api/images')
            console.log('data: ', data)
            this.files = data.files
            this.folders = data.rootDirectories
            this.path = [{ name: 'Dossier Racine', folder: '/', active: true }]
            this.$store.commit('loading/SET_LOADING', false)
        } catch {
            this.$store.commit('loading/SET_LOADING', false)
        }
    },
    data() {
        return {
            formNewImage: new Form({
                image: null,
                path: ''
            }),
            formNewFolder: new Form({
                name: '',
                fileType: 'images',
                path: ''
            }),
            showSidebar: false,
            selectedFolder: null,
            selectedFile: null,
            files: [],
            folders: [],
            path: [],
            selectedImageHeight: null,
            selectedImageWidth: null,
            url: null,
            clickCount: 0,
            clickTimer: null,
            tabIndex: 1,
            uploadReady: true
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        currentPath() {
            return this.path
                .map(folder => folder.name)
                .filter(folder => folder !== 'Dossier Racine')
                .join('/')
        }
    },
    methods: {
        onFileChange(e) {
            // Image preview
            const file = e.target.files[0]
            this.url = URL.createObjectURL(file)
            this.formNewImage.image = file
        },
        selectFolder(folder) {
            console.log('selectFolder: ', folder)
            this.selectedFile = null
            this.showSidebar = true
            this.selectedFolder = folder
        },
        selectFile(file) {
            console.log('selectFile: ', file)
            this.selectedFolder = null
            this.showSidebar = true
            this.selectedFile = file
        },
        clearFileInput() {
            this.uploadReady = false
            this.$nextTick(() => {
                this.uploadReady = true
            })
        },
        insertImage(file) {
            console.log('insertImage: ', file)
            // return

            this.$emit('insertImage', file)
            this.showSidebar = false
            // this.$bvModal.hide('filesModal')
            this.$bvModal.hide('imagesModal')
        },
        onImageLoad(e) {
            console.log('onImageLoad: ', e)
            // const abc = document.getElementById('selectedImage')
            const abc = this.$refs.selectedImage
            console.log('naturalWidth: ', abc.naturalWidth)
            console.log('naturalHeight: ', abc.naturalHeight)
            this.selectedImageWidth = abc.naturalWidth
            this.selectedImageHeight = abc.naturalHeight
        },
        formatFileName(file) {
            const index = file.lastIndexOf('/')
            return file.substring(index + 1)
        },
        handleClick(folder) {
            this.clickCount++
            if (this.clickCount === 1) {
                var self = this
                this.clickTimer = setTimeout(() => {
                    console.log('Click!')
                    this.clickCount = 0
                    this.selectFolder(folder)
                }, 200)
            } else {
                clearTimeout(this.clickTimer)
                console.log('Double click!')
                this.clickCount = 0
                this.navigateToFolder(folder)
            }
        },
        navigateToFolder(folder) {
            console.log('navigateToFolder: ', folder)
            this.tabIndex = 0
            this.openFolder(folder)
        },

        async openFolder(folder) {
            console.log('openFolder: ', folder)
            // console.log('abc: ', folder.split('/').join(':'))
            const { data } = await axios.post(`/api/images/folder/images`, { folder })
            console.log('data: ', data)
            this.folders = data.folders
            this.files = data.files
            this.path = []
            this.path.push({ name: 'Dossier Racine', folder: '/' })
            if (data.folder) {
                data.folder.split('/').forEach(folder => {
                    if (folder) {
                        this.path.push({ name: folder, active: false, folder })
                    }
                })
            }
            this.path[this.path.length - 1]['active'] = true
        },
        async createNewFolder() {
            try {
                // this.formNewFolder.path = this.path.map(folder => folder.name).filter(folder => folder !== 'Dossier racine').join('/')
                this.formNewFolder.path = this.currentPath
                const { data } = await this.formNewFolder.submit('post', '/api/images/folder', {
                    transformRequest: [
                        function(data, headers) {
                            return objectToFormData(data)
                        }
                    ]
                })
                console.log('data: ', data)
                // await this.openFolder(this.formNewFolder.path)
                this.navigateToFolder(this.formNewFolder.path)
                this.formNewFolder.name = ''
                this.$noty.success('Le dossier a été créé avec succès.')
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Une erreur s'est produite et le dossier n'a pas pu être créé.")
            }
        },

        async uploadImage() {
            try {
                console.log('this.formNewImage: ', this.formNewImage)
                this.$store.commit('loading/SET_LOADING', true)
                this.formNewImage.path = this.currentPath
                // const { data } = await this.form.submit('post', '/api/pages/upload-image', {
                //     transformRequest: [
                //         function(data, headers) {
                //             return objectToFormData(data)
                //         }
                //     ]
                // })
                const { data } = await this.formNewImage.submit('post', '/api/images', {
                    transformRequest: [
                        function(data, headers) {
                            return objectToFormData(data)
                        }
                    ]
                })
                console.log('data: ', data)
                this.clearFileInput

                // const { all } = await axios.get('/api/list-all-files')
                // this.files = data.files
                // this.files.unshift(data.newImageArray)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Image ajoutée avec succès.')
            } catch (error) {
                console.log('error: ', error)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.error("Une erreur est survenue et l'image n'a pas pu être uploadée.")
            }
        },

        async deleteImage(fileName) {
            try {
                console.log('deleteImage: ', fileName)
                await axios.post(`/api/images/delete`, { fileName })
                await this.openFolder(this.currentPath)
                this.showSidebar = false
                this.$noty.success("L'image a été supprimée avec succès.")
            } catch (error) {
                this.$noty.error("Une erreur s'est produite et l'image n'a pas pu être supprimée.")
                console.log('error: ', error)
            }
        },
        async deleteFolder() {
            try {
                console.log('deleteFolder')
                const { data } = await axios.post(`/api/images/folder/delete`, { folderName: this.selectedFolder })
                // const { data } = await axios.delete(`/api/images/folder/${selectedFolder}`)
                console.log('data: ', data)
                await this.openFolder(this.currentPath)
                this.showSidebar = false
                this.$noty.success('Le dossier a été supprimé avec succès.')
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Une erreur s'est produite et le dossier n'a pas pu être supprimé.")
            }
        },
        closeModal() {
            console.log('closeModal')
            this.$emit('closeImagesModal', false)
            this.$bvModal.hide('imagesModal')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.folder:hover {
    cursor: pointer;
    background: $light;
}
.image:hover {
    cursor: pointer;
    border: 2px solid $primary;
}
#preview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
}

#preview img {
    max-width: 50%;
    max-height: 200px;
}
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
