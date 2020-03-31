<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/contents"><font-awesome-icon icon="chair" />&nbsp;Gestion du contenu</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Editer</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item to="/admin/pages"><font-awesome-icon icon="file-alt" />&nbsp;Pages</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Editer le contenu de la page <span class="primary-color" v-if="page">"{{ page.title }}"</span></h2>

		<!-- pages: {{ pages }}<br /><br /> -->
		<!-- page: {{ page }}<br /><br /> -->
		<!-- updatedPage: {{ updatedPage }}<br /><br /> -->
		<!-- updatedPage['content']: {{ updatedPage['content'] }}<br /><br /> -->

		<tinymce-editor 
			:api-key="tinymceKey"
			:init="tinymceInit"
			v-model="updatedPage['content']"
			v-if="updatedPage"
		></tinymce-editor>

		<b-row class="justify-content-center my-2">
			<b-button variant="primary" :disabled="loading" @click="updatePage">
				<b-spinner small type="grow" v-if="loading"></b-spinner>
				Editer le contenu
			</b-button>
		</b-row>
	<!-- </div> -->
	</b-container>
</template>

<script>
	import axios from 'axios'

	// Tinymce Editor
	import Editor from '@tinymce/tinymce-vue'

	export default {
		components: {
			'tinymce-editor': Editor,
		},
		async created () {
			const pageSlug = this.$route.params.id
			this.pageSlug = pageSlug
			console.log('pageSlug: ', pageSlug)

			if (!this.$store.getters['pages/pages'][pageSlug]) {
				await this.$store.dispatch('pages/fetchPageBySlug', pageSlug)
			}
			const { data } = await axios.get('/api/pages/images')
			console.log('data: ', data)

			// Populate images list
			if (data.images) {
				data.images.forEach(image => {
					console.log(image.lastIndexOf('/'))
					this.tinymceInit.image_list.push({ title: image.substr(image.lastIndexOf('/') + 1, image.lastIndexOf('.')), value: image })
				})
			} 
		},
		mounted () {
			this.updatedPage = {
				slug: this.pageSlug,
				title: this.page['title'],
				content: this.page['content']
			}
		},
		data () {
			return {
				pageSlug: '',
				// updatedContent: {
				// 	slug: '',
				// 	content: ''
				// },
				updatedPage: {},
				tinymceKey: process.env.MIX_TINYMCE_KEY,
				tinymceInit: {
					// plugins: 'image code',
					// plugins: 'code print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars image link media template codesample table hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools emoticons',
					plugins: 'code print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern charmap emoticons',
					menubar: 'file edit view insert format tools table help',
					toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
					image_advtab: true,
					height: 400,
					image_list: [],
  					image_prepend_url: '/images/',
	  				images_upload_handler: function (blobInfo, success, failure) {
	  					// console.log('blobInfo: ', blobInfo)
	      				let formData = new FormData()
						formData.append('file', blobInfo.blob(), blobInfo.filename())
	      				// console.log('formData: ', formData)

						axios.post('/api/pages/upload-image', formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}).then(function (res) {
			            	// console.log(res.data)
			                success(res.data.location)
							// success('/images/400x400.jpg')
			            }).catch(function (error) {
			                console.log('error: ', error)
			            });
	    			}
				}
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			pages () {
				return this.$store.getters['pages/pages']
			},
			page: {
				get: function() {
					return JSON.parse(JSON.stringify(this.$store.getters['pages/pages'][this.pageSlug]))
				},
				// set: function(value) {
				// 	console.log('set content value: ', value)
				// 	this.updatedContent['slug'] = this.contentSlug
				// 	this.updatedContent['content'] = value
				// },
			}
		},
		methods: {
			async updatePage () {
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
					this.$noty.error('Une erreur est survenue et le contenu n\'a pas pu être mis à jour.')
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