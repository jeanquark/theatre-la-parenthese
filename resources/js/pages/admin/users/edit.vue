<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/users"><font-awesome-icon icon="chair" />&nbsp;Utilisateurs</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Editer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users"><font-awesome-icon icon="users" />&nbsp;Utilisateurs</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users" class="navigation">
				<font-awesome-icon icon="file-alt" />
				<span>Utilisateurs</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>

		<h2 class="text-center">Editer un utilisateur</h2>
		<!-- userId: {{ userId }}<br /><br /> -->
		<!-- user: {{ user }}<br /><br /> -->


		<form @submit.prevent="updateUser" v-if="user && user.id">
			<div class="form-row p-3">
				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="firstname">Prénom</label>
				    	<input type="text" class="form-control" id="firstname" placeholder="" v-model="user.firstname">
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="lastname">Nom</label>
				    	<input type="text" class="form-control" id="lastname" placeholder="" v-model="user.lastname">
				  	</div>
				</div>

				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="email">E-mail</label>
				    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="" v-model="user.email">
				  	</div>
				</div>
			</div>

			<div class="row my-3">
				<div class="col-12 text-center">
		  			<button type="submit" class="btn btn-primary">Editer cet utilisateur</button>
		  		</div>
		  	</div>
		</form>

	<!-- </div> -->
	</b-container>
</template>

<script>
	import axios from 'axios'

	// Datepicker
	import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
	import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

	// Pretty checkboxes
	import PrettyCheck from 'pretty-checkbox-vue/check'

	// Multiselect
	import Multiselect from 'vue-multiselect'
	import 'vue-multiselect/dist/vue-multiselect.min.css'

	export default {
		layout: 'backend',
		components: {
			VueCtkDateTimePicker,
			'p-check': PrettyCheck,
			Multiselect
		},
		async created () {
			if (this.$store.getters['users/users'].length < 1) {
				this.$store.dispatch('users/fetchUsers')
			}
		},
		async mounted () {
			this.userId = this.$route.params.id
			const userId = parseInt(this.$route.params.id)
			console.log('userId: ', userId)
			await this.$store.dispatch('users/fetchUser', { userId })
		},
		data () {
			return {
				userId: null,
			}
		},
		computed: {
			users () {
				return this.$store.getters['users/users']
			},
			user () {
				return this.$store.getters['users/user']
			}
		},
		methods: {
			async updateUser () {
				try {
	                await this.$store.dispatch('users/updateUser', { user: this.user })
					this.$router.push('/admin/users')
				} catch (error) {
					console.log('error: ', error)
				}
			}
		}
	}
</script>

<style scoped>

</style>