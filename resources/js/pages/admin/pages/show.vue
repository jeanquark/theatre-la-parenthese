<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/contents"><font-awesome-icon icon="chair" />&nbsp;Gestion du contenu</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Montrer</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item to="/admin/pages" class="navigation">
				<font-awesome-icon icon="file-alt" />
				<span>Pages</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center mb-3">Contenu de la page <span class="primary-color" v-if="page">"{{ page.title }}"</span>:</h2>

		<!-- pages: {{ pages }}<br /><br /> -->
		<!-- page: {{ page }}<br /><br /> -->
		
		<div v-html="page.content" v-if="page"></div>
		
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {
		async created () {
			const pageSlug = this.$route.params.id
			this.pageSlug = pageSlug
			console.log('pageSlug: ', pageSlug)

			if (!this.$store.getters['pages/pages'][pageSlug]) {
				await this.$store.dispatch('pages/fetchPageBySlug', pageSlug)
			}
		},
		data () {
			return {
				pageSlug: '',
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			pages () {
				return this.$store.getters['pages/pages']
			},
			page () {
				return this.pages[this.pageSlug]
			}
		}
	}
</script>

<style lang="scss" scoped>
    @import './resources/sass/_variables.scss';
	.primary-color {
		// color: var(--primary-color);
		color: $primary;
	}
</style>