<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/users"><font-awesome-icon icon="chair" />&nbsp;Utilisateurs</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Créer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users"><font-awesome-icon icon="users" />&nbsp;Utilisateurs</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users" class="navigation">
				<font-awesome-icon icon="users" />
				<span>Utilisateurs</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Créer un nouvel utilisateur</h2>

		<form @submit.prevent="createUser">
			<div class="form-row">
				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="firstname">Prénom</label>
				    	<input type="text" class="form-control" id="firstname" placeholder="" v-model="form.firstname">
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="lastname">Nom</label>
				    	<input type="text" class="form-control" id="lastname" placeholder="" v-model="form.lastname">
				  	</div>
				</div>

				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="email">E-mail</label>
				    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="" v-model="form.email">
				  	</div>
				</div>
			</div>			

			<div class="row my-3">
				<div class="col-12 text-center">
		  			<button type="submit" class="btn btn-primary">Créer cet utilisateur</button>
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
		created () {
			console.log('Hello!')
		},
		mounted () {
		},
		data () {
			return {
				form: {
					firstname: 'John',
					lastname: 'Doe',
					email: 'john.doe@example.com',
				},
			}
		},
		computed: {
		},
		methods: {
			async createUser () {
				try {
					console.log('this.form: ', this.form)
					
					await this.$store.dispatch('users/createUser', { activity: this.form })
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