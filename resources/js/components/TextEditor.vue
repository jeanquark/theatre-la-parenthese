<template>
    <div>
        <!-- formContent: {{ formContent }} -->
        <b-form-group label="Contenu de la page:">
            <b-button variant="primary" v-b-tooltip.hover title="Gras" class="mx-.5" @click.prevent="formatDoc('bold')">
                <font-awesome-icon size="1x" icon="bold" class="" />
            </b-button>

            <b-button variant="primary" v-b-tooltip.hover title="Italic" class="mx-.5" @click.prevent="formatDoc('italic')">
                <font-awesome-icon size="1x" icon="italic" class="" />
            </b-button>

            <b-button variant="primary" v-b-tooltip.hover title="Souligné" class="mx-.5" @click.prevent="formatDoc('underline')">
                <font-awesome-icon size="1x" icon="underline" class="" />
            </b-button>

            <b-button variant="primary" v-b-tooltip.hover title="Aligner à gauche" class="mx-.5" @click.prevent="formatDoc('justifyleft')">
                <font-awesome-icon size="1x" icon="align-left" class="" />
            </b-button>

            <b-button variant="primary" v-b-tooltip.hover title="Aligner au centre" class="mx-.5" @click.prevent="formatDoc('justifycenter')">
                <font-awesome-icon size="1x" icon="align-center" class="" />
            </b-button>

            <b-button variant="primary" v-b-tooltip.hover title="Aligner à droite" class="mx-.5" @click.prevent="formatDoc('justifyright')">
                <font-awesome-icon size="1x" icon="align-right" class="" />
            </b-button>

            <b-button variant="primary" title="Liste point" class="mx-.5" @click.prevent="formatDoc('insertUnorderedList')">
                <font-awesome-icon size="1x" icon="list-ul" />
            </b-button>

            <b-button variant="primary" title="Liste nombre" class="mx-.5" @click.prevent="formatDoc('insertOrderedList')">
                <font-awesome-icon size="1x" icon="list-ol" />
            </b-button>

            <b-button variant="primary" title="Lien" class="mx-.5" @click.prevent="openCreateLinkModal">
                <font-awesome-icon size="1x" icon="link" />
            </b-button>

            <b-button variant="secondary" v-b-tooltip.hover title="Ajouter image" :disabled="!focused" @mousedown.prevent="focused = true" class="mx-.5" @click.prevent="openImagesModal">
                <font-awesome-icon size="1x" icon="image" class="" />
            </b-button>

            <b-button variant="secondary" v-b-tooltip.hover title="Ajouter PDF" :disabled="!focused" @mousedown.prevent="focused = true" class="mx-.5" @click.prevent="openDocumentsModal">
                <font-awesome-icon size="1x" icon="file-pdf" class="" />
            </b-button>

            <b-button variant="dark" v-b-tooltip.hover title="Voir code" class="mx-.5" @click="toggleShowHTML">
                <font-awesome-icon size="1x" icon="code" />
            </b-button>

            <b-row no-gutters class="justify-content-center my-2" v-if="selectedImageNode">
                <b-col cols="12">
                    <image-properties :selectedImageProps="selectedImageProps" @updateSelectedImageProperties="updateSelectedImageProperties" />
                </b-col>
            </b-row>

            <div contenteditable="true" id="textBox" v-html="content" @focus="focused = true" @blur="focused = false" @click="selectElement" class="mt-1" v-if="!showHTML"></div>

            <div contenteditable="true" id="textBox" @focus="focused = true" @blur="focused = false" class="mt-1" v-else>
                <pre style="">{{ content }}</pre>
            </div>
        </b-form-group>

        <images-modal @insertImage="insertImage" @closeImagesModal="showImagesModal = false" v-if="showImagesModal" />
        <documents-modal @insertDocument="insertDocument" @closeDocumentsModal="showDocumentsModal = false" v-if="showDocumentsModal" />
        <create-link-modal :selectedText="selectedText" @insertLink="insertLink" @closeLinkModal="showCreateLinkModal = false" v-if="showCreateLinkModal" />
    </div>
</template>

<script>
import ImagesModal from '~/components/ImagesModal'
import DocumentsModal from '~/components/DocumentsModal'
import CreateLinkModal from '~/components/CreateLinkModal'
import ImageProperties from '~/components/ImageProperties'
export default {
    components: {
        ImagesModal,
        DocumentsModal,
        CreateLinkModal,
        ImageProperties
    },
    props: [ 'formContent' ],
    created () {
    },
    mounted () {
        this.content = this.formContent
    },
    data() {
        return {
            // content: '<img src="/images/favicon.png" style="margin-right: 20px;" /> Lien sur cette page.',
            // content: this.formContent,
            content: '',
            showHTML: false,
            checked: false,
            showImagesModal: false,
            showDocumentsModal: false,
            showCreateLinkModal: false,
            selectedImageNode: null,
            selectedImageProps: {
                width: 0,
                height: 0,
                style: {}
            },
            selectedText: '',
            focused: false,
            selRange: null
        }
    },
    computed: {},
    methods: {
        toggleShowHTML() {
            if (!this.showHTML) {
                this.content = document.getElementById('textBox').innerHTML
                
            } else {
                this.content = document.getElementById('textBox').innerText
            }
            this.showHTML = !this.showHTML
            this.$emit('toggleShowHTML', this.showHTML)
        },
        selectElement(event) {
            this.selectedImageNode = null
            // console.log('selectElement: ', event)
            const element = event.target.tagName.toLowerCase()
            // console.log('element: ', element)
            if (element === 'img') {
                console.log('img!')
                this.selectedImageNode = event.target
                this.selectedImageProps['width'] = event.target.width
                this.selectedImageProps['height'] = event.target.height
                this.selectedImageProps['style']['margin-left'] = event.target.style['margin-left'] ? event.target.style['margin-left'].match(/\d/g).join('') : 0
                this.selectedImageProps['style']['margin-right'] = event.target.style['margin-right'] ? event.target.style['margin-right'].match(/\d/g).join('') : 0
                this.selectedImageProps['style']['float'] = event.target.style.float
            }
        },
        updateSelectedImageProperties(value, type) {
            // console.log('updateSelectedImageProperties2: ', value, type)
            // console.log('selectedImageNode: ', this.selectedImageNode)
            if (type === 'width' || type === 'height') {
                this.selectedImageNode[type] = value
            }
            if (type === 'marginLeft') {
                this.selectedImageNode.style.marginLeft = `${value}px`
            }
            if (type === 'marginRight') {
                this.selectedImageNode.style.marginRight = `${value}px`
            }
            if (type === 'float') {
                this.selectedImageNode.style.float = value
            }
        },
        openImagesModal() {
            // console.log('openImagesModal')
            this.showImagesModal = true
            setTimeout(() => {
                this.$bvModal.show('imagesModal')
            }, 300)
        },
        openDocumentsModal() {
            // console.log('openDocumentsModal')
            this.showDocumentsModal = true
            setTimeout(() => {
                this.$bvModal.show('documentsModal')
            }, 300)
        },
        openCreateLinkModal() {
            // console.log('openCreateLinkModal')
            this.selectedText = window.getSelection().toString() || 'Lien'
            this.selRange = this.saveSelection()
            this.showCreateLinkModal = true
            setTimeout(() => {
                this.$bvModal.show('createLinkModal')
            }, 300)
        },
        insertImage(filePath) {
            // console.log('insertImage2: ', filePath)

            this.showModal = false
            // const image = 'http://dummyimage.com/160x90'
            const image = `/images/${filePath}`
            this.formatDoc('insertImage', image)
        },
        insertDocument(filePath, fileType, fileName) {
            // console.log('insertDocument', filePath, fileType, fileName)
            this.formatDoc('insertHTML', `<a href="/documents/${filePath}" type="${fileType}" title="${fileName}" target="_blank">${fileName}</a>`)
        },
        insertLink({ linkType, linkPage }) {
            // console.log('insertLink', linkType, linkPage)
            let link
            if (linkType === 'external') {
                link = `<a href="${linkPage.external}">${this.selectedText}</a>`
            } else {
                link = `<router-link to="/${linkPage.internal.slug}"><span class="link">${this.selectedText}</span></router-link>`
            }
            this.restoreSelection(this.selRange)
            document.getElementById('textBox').focus()
            this.insertTextAtCursor(link)
        },
        formatDoc(sCmd, sValue) {
            document.execCommand(sCmd, false, sValue)
        },
        // Insert link persist selection
        saveSelection() {
            if (window.getSelection) {
                let sel
                sel = window.getSelection()
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0)
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange()
            }
            return null
        },
        restoreSelection(range) {
            if (range) {
                if (window.getSelection) {
                    let sel
                    sel = window.getSelection()
                    sel.removeAllRanges()
                    sel.addRange(range)
                } else if (document.selection && range.select) {
                    range.select()
                }
            }
        },
        insertTextAtCursor(text) {
            let sel, range, html
            if (window.getSelection) {
                sel = window.getSelection()
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0)
                    range.deleteContents()

                    var el = document.createElement('div')
                    el.innerHTML = text
                    var frag = document.createDocumentFragment(),
                        node,
                        lastNode
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node)
                    }
                    range.insertNode(frag)

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange()
                        range.setStartAfter(lastNode)
                        range.collapse(true)
                        sel.removeAllRanges()
                        sel.addRange(range)
                    }
                }
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange()
                range.pasteHTML(text)
                range.select()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
#textBox {
    width: 100%;
    height: 350px;
    border: 6px double $secondary;
    padding: 12px;
    overflow: scroll;
}
#textBox #sourceText {
    padding: 0;
    margin: 0;
    min-width: 498px;
    min-height: 200px;
}
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #008cba;
}
::v-deep #textBox img:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: 0.5s ease;
    background-color: $primary;
}
::v-deep #textBox .link {
    color: #2c5cad;
}
::v-deep #textBox .link:hover {
    color: #1c3c70;
    text-decoration: underline;
}
#editMode label {
    cursor: pointer;
}
.intLink {
    cursor: pointer;
}
img.intLink {
    border: 1px solid #000;
}
.disabled:hover {
    cursor: not-allowed;
    color: #000;
}

pre {
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
}
</style>
