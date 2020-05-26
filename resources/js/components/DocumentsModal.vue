<template>
    <b-modal size="xl" id="documentsModal" ok-disabled no-close-on-esc no-close-on-backdrop @close="closeModal">
        <template v-slot:modal-title>
            <span class="unselectable">Gestion des documents</span>
        </template>
        <!-- showDocumentsModal: {{ showDocumentsModal }}<br /><br /> -->
        <!-- showSidebar: {{ showSidebar }}<br /><br /> -->
        <!-- selectedFile: {{ selectedFile }}<br /><br /> -->
        <!-- files: {{ files }}<br /><br /> -->

        <b-tabs content-class="mt-3" v-model="tabIndex">
            <b-tab title="Documents" active
                ><!-- Tab List documents -->
                <b-sidebar aria-controls="details" title="Détails" shadow width="380px" class="unselectable" v-model="showSidebar">
                    <div class="px-3 py-2 text-white" v-if="selectedFile">
                        <div class="text-center">
                            <b-img src="/images/icons/pdf-icon.png" fluid thumbnail ref="selectedImage" class="mb-3"></b-img>
                        </div>
                        <p class="text-dark">
                            Nom: <b>{{ selectedFile[0] }}</b
                            ><br />
                            Type: <b>{{ formatFileName(selectedFile[1]) }}</b
                            ><br />
                            Taille: <b>{{ selectedFile[2] / 1000 }} Ko</b><br />
                            Dernière modification: <b>{{ selectedFile[3] | moment('DD-MM-YYYY HH:mm') }}</b
                            ><br />
                        </p>

                        <div class="text-center">
                            <b-button variant="primary" class="my-2" @click="insertDocument(selectedFile[0], selectedFile[1])">Insérer document</b-button><br />
                            <b-button variant="danger" size="sm" @click="deleteDocument(selectedFile[0])">Supprimer</b-button>
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
                <b-row class="justify-content-center my-3">
                    <b-col cols="6" md="3" lg="2" v-for="(folder, index) of folders" :key="`folder_${index}`" @click="handleClick(folder)">
                        <b-img fluid src="/images/icons/folder.png" class="folder"></b-img>
                        <p class="text-center" style="word-break: break-word;">{{ formatFileName(folder) }}</p>
                    </b-col>
                    <b-col cols="6" md="3" lg="2" v-for="(file, index) of files" :key="index" @click="selectFile(file)">
                        <b-img thumbnail fluid src="/images/icons/pdf-icon.png" class="image"></b-img>
                        <p class="text-center unselectable" style="word-break: break-word;">{{ formatFileName(file[0]) }}</p>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab title="Uploader un document"
                ><!-- Tab Upload document -->
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
                            accept=".pdf"
                            placeholder="Choisir un fichier..."
                            drop-placeholder="Placer le fichier ici..."
                            :class="{ 'is-invalid': formNewDocument.errors.has('document') }"
                            @change="onFileChange"
                            v-if="uploadReady"
                        ></b-form-file>
                        <has-error :form="formNewDocument" field="document" />
                    </b-col>
                </b-row>
                <b-row class="justify-content-center my-3">
                    <b-button variant="dark" size="sm" class="mx-2" @click="clearFileInput">Effacer</b-button>
                    <b-button variant="primary" :disabled="loading" @click.prevent="uploadDocument"><b-spinner small type="grow" v-if="loading"></b-spinner> Uploader</b-button>
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
    async created() {
        console.log('DocumentsModal mounted!')
        // const { data } = await axios.get('/api/list-all-documents')
        const { data } = await axios.get('/api/documents')
        console.log('data: ', data)
        this.files = data.files
        this.folders = data.rootDirectories
        this.path = [{ name: 'Dossier Racine', folder: '/', active: true }]
    },
    async mounted() {
        
    },
    data() {
        return {
            formNewDocument: new Form({
                document: null,
                path: ''
            }),
            formNewFolder: new Form({
                name: '',
                fileType: 'images',
                path: ''
            }),
            files: [],
            folders: [],
            path: [],
            showSidebar: false,
            selectedFolder: null,
            selectedFile: null,
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
            this.formNewDocument.document = file
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
            // this.fileName = this.formatRemoveFileExtension(file[0])
            this.showSidebar = true
            this.selectedFile = file
        },
        clearFileInput() {
            this.uploadReady = false
            this.$nextTick(() => {
                this.uploadReady = true
            })
        },
        insertDocument(filePath, fileType) {
            const fileName = this.formatRemoveFileExtension(filePath)
            console.log('insertDocument: ', filePath, fileType, fileName)
            // return
            this.$emit('closeDocumentsModal', false)
            this.$emit('insertDocument', filePath, fileType, fileName)
            this.showSidebar = false
            this.$bvModal.hide('filesModal')
        },
        formatFileName(file) {
            const index = file.lastIndexOf('/')
            return file.substring(index + 1)
        },
        formatRemoveFileExtension(file) {
            const index = file.lastIndexOf('.')
            return file.substring(0, index)
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
        async uploadDocument() {
            try {
                console.log('this.formNewDocument: ', this.formNewDocument)
                this.$store.commit('loading/SET_LOADING', true)
                this.formNewDocument.path = this.currentPath

                const { data } = await this.formNewDocument.submit('post', '/api/documents', {
                    transformRequest: [
                        function(data, headers) {
                            return objectToFormData(data)
                        }
                    ]
                })
                console.log('data2: ', data)
                this.files.unshift(data.newDocumentArray)
                this.clearFileInput

                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Document ajouté avec succès.')
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Nous sommes désolés. Une erreur est survenue et le document n'a pas pu être uploadé.")
                this.$store.commit('loading/SET_LOADING', false)
            }
        },

        async openFolder(folder) {
            console.log('openFolder: ', folder)
            const { data } = await axios.post(`/api/documents/folder/documents`, { folder })
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
                this.formNewFolder.path = this.currentPath
                const { data } = await this.formNewFolder.submit('post', '/api/documents/folder', {
                    transformRequest: [
                        function(data, headers) {
                            return objectToFormData(data)
                        }
                    ]
                })
                console.log('data: ', data)
                // return
                this.navigateToFolder(this.formNewFolder.path)
                this.formNewFolder.name = ''
                this.$noty.success('Le dossier a été créé avec succès.')
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Une erreur s'est produite et le dossier n'a pas pu être créé.")
            }
        },
        async deleteDocument(fileName) {
            try {
                console.log('deleteDocument: ', fileName)
                await axios.post(`/api/documents/delete`, { fileName })
                await this.openFolder(this.currentPath)
                this.showSidebar = false
                this.$noty.success('Le document a été supprimé avec succès.')
            } catch (error) {
                this.$noty.error("Une erreur s'est produite et le document n'a pas pu être supprimé.")
                console.log('error: ', error)
            }
        },
        async deleteFolder() {
            try {
                console.log('deleteFolder')
                const { data } = await axios.post(`/api/documents/folder/delete`, { folderName: this.selectedFolder })
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
            this.$emit('closeDocumentsModal', false)
            this.$bvModal.hide('documentsModal')
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
