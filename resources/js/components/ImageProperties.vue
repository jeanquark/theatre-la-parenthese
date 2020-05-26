<template>
    <b-row no-gutters align-v="center" class="justify-content-center bg-light" style="border-radius: 3px;">
        <!-- format: {{ format }} -->
        <b-form-group label="Largeur (px):" label-for="width" class="mx-2">
            <b-form-input type="number" min="0" id="width" v-model="selectedImageProps['width']" @update="updateSelectedImage($event, 'width')"></b-form-input>
        </b-form-group>

        <font-awesome-icon size="1x" icon="lock" class="icon" @click="keepImageProportions = false" v-if="keepImageProportions" />
        <font-awesome-icon size="1x" icon="lock-open" class="icon" @click="keepImageProportions = true" v-else />

        <b-form-group label="Hauteur (px):" label-for="height" class="mx-2">
            <b-form-input type="number" min="0" id="height" v-model="selectedImageProps['height']" @update="updateSelectedImage($event, 'height')"></b-form-input>
        </b-form-group>
        <b-form-group label="Marge gauche (px):" label-for="marginLeft" class="mx-2">
            <b-form-input type="number" min="0" id="marginLeft" :value="selectedImageProps['style']['margin-left']" @update="updateSelectedImage($event, 'marginLeft')"></b-form-input>
        </b-form-group>
        <b-form-group label="Marge droite (px):" label-for="marginRight" class="mx-2">
            <b-form-input type="number" min="0" id="marginRight" :value="selectedImageProps['style']['margin-right']" @update="updateSelectedImage($event, 'marginRight')"></b-form-input>
        </b-form-group>
        <b-form-group label="Alignement:" label-for="float" class="mx-2">
            <b-form-select :options="['left', 'right']" id="float" :value="selectedImageProps['style']['float']" @change="updateSelectedImage($event, 'float')"></b-form-select>
        </b-form-group>
    </b-row>
</template>

<script>
export default {
    props: ['selectedImageProps'],
    async created() {},
    async mounted() {},
    data() {
        return {
            showImagePropertiesSidebar: true,
            keepImageProportions: true,
            format: Math.round(this.selectedImageProps['width'] / this.selectedImageProps['height'])
        }
    },
    computed: {},
    methods: {
        updateSelectedImage(value, type) {
            if (type === 'width') {
                if (this.keepImageProportions) {
                    this.$emit('updateSelectedImageProperties', value, 'width')
                    this.selectedImageProps['height'] = Math.round(this.selectedImageProps['width'] / this.format)
                    this.$emit('updateSelectedImageProperties', this.selectedImageProps['height'], 'height')
                } else {
                    this.$emit('updateSelectedImageProperties', this.selectedImageProps['height'], 'height')
                    this.$emit('updateSelectedImageProperties', value, 'width')
                }
            }
            if (type === 'height') {
                if (this.keepImageProportions) {
                    this.$emit('updateSelectedImageProperties', value, 'height')
                    this.selectedImageProps['width'] = Math.round(this.selectedImageProps['height'] * this.format)
                    this.$emit('updateSelectedImageProperties', this.selectedImageProps['width'], 'width')
                } else {
                    this.$emit('updateSelectedImageProperties', this.selectedImageProps['width'], 'width')
                    this.$emit('updateSelectedImageProperties', value, 'height')
                }
            }
            // if (this.keepImageProportions && type === 'width') {
            // }
            // if (this.keepImageProportions && type === 'height') {
            // }
        },
        updateSelectedImage2(value, type) {
            console.log('updateSelectedImage: ', value, type)
            // const format = this.selectedImageProps['width']/this.selectedImageProps['height']
            console.log('format: ', this.format)
            if (this.keepImageProportions && type === 'width') {
                console.log('Keep image proportions while modifying width')
                const newWidth = this.selectedImageProps['width']
                console.log('newWidth: ', newWidth)
                const newHeight = this.selectedImageProps['width'] / this.format
                console.log('newHeight: ', newHeight)
                // this.selectedImageProps['height'] = this.selectedImageProps['width']
                // this.selectedImageProps['height'] = this.selectedImageProps['width']
                // this.selectedImageProps['height'] = this.selectedImageProps['width'] * format
                // this.$emit('updateSelectedImageProperties', this.selectedImageProps['width'], 'heigth')
                // return
            }
            if (this.keepImageProportions && type === 'height') {
                console.log('Keep image proportions while modifying height')
                // this.selectedImageProps['width'] = this.selectedImageProps['height']
                // this.selectedImageProps['width'] = this.selectedImageProps['width'] * format
                // this.$emit('updateSelectedImageProperties', this.selectedImageProps['height'], 'width')
            }
            // else {

            this.$emit('updateSelectedImageProperties', 200, 'height')
            this.$emit('updateSelectedImageProperties', value, type)
            // }
        },
        closeModal() {
            console.log('closeModal')
            this.$emit('closeImagePropertiesToast', false)
            // this.$bvModal.hide('imagesModal')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.icon:hover {
    cursor: pointer;
}
// .image:hover {
//     cursor: pointer;
//     border: 2px solid $primary;
// }
</style>
