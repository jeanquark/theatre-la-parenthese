<template>
    <b-modal size="md" id="createLinkModal" title="Créer un lien" ok-disabled no-close-on-esc no-close-on-backdrop @close="closeModal">
        <template v-slot:modal-title>
            <span class="unselectable">Lien</span>
        </template>
        <!-- selectedText: {{ selectedText }}<br /><br /> -->
        <!-- pageLink.internal: {{ pageLink.internal }}<br /><br /> -->
        <!-- pageLink.external: {{ pageLink.external }}<br /><br /> -->
        <!-- pageLink: {{ pageLink }}<br /><br /> -->
        <!-- linkType: {{ linkType }}<br /><br /> -->
        <!-- linkPage: {{ linkPage }}<br /><br /> -->
        <!-- url: {{ url }}<br /><br /> -->
        <!-- pages: {{ pages }}<br /><br /> -->
        <!-- pagesArray: {{ pagesArray }}<br /><br /> -->

        <b-form-group label="Sélectionner type de lien" label-for="linkType">
            <b-form-radio-group :options="linkOptions" name="linkType" v-model="linkType"></b-form-radio-group>
        </b-form-group>


        <b-form-group label="Lien interne:" v-if="linkType === 'internal'">
            <b-form-select v-model="linkPage.internal">
                <option v-for="page in pagesArray" :value="{ id: page.id, name: page.name, slug: page.slug }" :key="page.id">{{ page.name }}</option>
            </b-form-select>
        </b-form-group>

        <b-form-group label="Lien externe:" label-for="externalLink" v-else>
            <b-form-input id="externalLink" name="externalLink" placeholder="http://google.ch" v-model="linkPage.external"></b-form-input>
        </b-form-group>

        <template v-slot:modal-footer>
            <b-row class="">
                <b-button variant="dark" size="md" class="float-right mr-2" @click="closeModal">
                    Fermer
                </b-button>
                <b-button variant="primary" size="md" class="float-right" @click="insertLink">
                    Insérer
                </b-button>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import { objectToFormData } from 'object-to-formdata'
export default {
props: ['selectedText'],
    async created() {},
    async mounted() {
        try {
            // console.log('CreateLinkModal mounted!')
            if (Object.keys(this.$store.getters['pages/pages']).length <= 2) {
                await this.$store.dispatch('pages/fetchPages')
            }
        } catch (error) {
            console.log('error: ', error)
        }
    },
    data() {
        return {
            pageLink: {},
            linkType: 'external',
            linkPage: {
                internal: {
                    // id: '',
                    // name: '',
                    // slug: ''
                },
                external: 'http://google.ch'
            },
            // internalLink: '',
            // externalLink: '',
            // selected: 'first',
            linkOptions: [
                {
                    text: 'Interne',
                    value: 'internal'
                },
                {
                    text: 'Externe',
                    value: 'external'
                }
            ]
            // options: [
            //   { text: 'First radio', value: 'first' },
            //   { text: 'Second radio', value: 'second' },
            //   { text: 'Third radio', value: 'third' }
            // ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        pages() {
            return this.$store.getters['pages/pages']
        },
        pagesArray() {
            const array = []
            for (let key in this.pages) {
                if (this.pages.hasOwnProperty(key) && this.pages[key] != null) {
                    array.push(this.pages[key])
                }
            }
            return array
        }
    },
    methods: {
        insertLink() {
            console.log('linkPage: ', this.linkType, this.linkPage)
            this.$emit('insertLink', { linkType: this.linkType, linkPage: this.linkPage })
            this.$bvModal.hide('createLinkModal')
        },
        closeModal() {
            console.log('closeModal')
            this.$emit('closeLinkModal', false)
            this.$bvModal.hide('createLinkModal')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
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
