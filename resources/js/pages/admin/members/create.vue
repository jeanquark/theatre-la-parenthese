<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/members"><font-awesome-icon icon="chair" />&nbsp;Membres</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Créer</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item to="/admin/members"><font-awesome-icon icon="id-card-alt" />&nbsp;Membres</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>
        
		<h2 class="text-center">Ajouter un nouveau membre à la troupe</h2>
		
		<b-form @submit.prevent="addNewMember">
            <b-row align-v="center" class="justify-content-start my-3 px-3">
                <b-col cols="12" md="6">
                    <b-form-group label="Prénom" label-for="newMemberFirstname">
                        <b-form-input id="newMemberFirstname" placeholder="Prénom" :class="{ 'is-invalid': form.errors.has('firstname') }" v-model="form.firstname"></b-form-input>
                        <has-error :form="form" field="firstname" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Nom" label-for="newMemberLastname">
                        <b-form-input id="newMemberLastname" placeholder="Nom" :class="{ 'is-invalid': form.errors.has('lastname') }" v-model="form.lastname"></b-form-input>
                        <has-error :form="form" field="lastname" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="E-mail" label-for="newMemberEmail">
                        <b-form-input id="newMemberEmail" placeholder="E-mail" :class="{ 'is-invalid': form.errors.has('email') }" v-model="form.email"></b-form-input>
                        <has-error :form="form" field="email" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Téléphone" label-for="newMemberPhone">
                        <b-form-input id="newMemberPhone" placeholder="Téléphone" :class="{ 'is-invalid': form.errors.has('phone') }" v-model="form.phone"></b-form-input>
                        <has-error :form="form" field="phone" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="justify-content-center my-2">
                <b-button variant="primary" :disabled="loading" type="submit">
                    <b-spinner small type="grow" v-if="loading"></b-spinner>
                    Créer nouveau membre
                </b-button>
            </b-row>
        </b-form>

		<!--<form @submit.prevent="addNewMember">
			<div class="form-row">
				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="firstname">Prénom</label>
				    	<input type="text" id="firstname" name="firstname" :class="{ 'is-invalid': form.errors.has('firstname') }" class="form-control" v-model="form.firstname">
				    	<has-error :form="form" field="firstname" />
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="lastname">Nom</label>
				    	<input type="text" id="lastname" name="lastname"  :class="{ 'is-invalid': form.errors.has('lastname') }" class="form-control" v-model="form.lastname">
				    	<has-error :form="form" field="lastname" />
				  	</div>
				</div>

				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="email">E-mail</label>
				    	<input type="email" id="email" name="email" aria-describedby="emailHelp" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" v-model="form.email">
				    	<has-error :form="form" field="email" />
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="phone">Téléphone</label>
				    	<input type="text" id="phone" name="phone" :class="{ 'is-invalid': form.errors.has('phone') }" class="form-control" v-model="form.phone">
				    	<has-error :form="form" field="phone" />
				  	</div>
				</div>
			</div>			

			<div class="row my-3">
				<div class="col-12 text-center">
		  			<button type="submit" class="btn btn-primary">Créer ce membre</button>
		  		</div>
		  	</div>
		</form>-->
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

	// Form validation Laravel - Vue
	import Form from 'vform'

	export default {
		layout: 'backend',
		components: { 
			VueCtkDateTimePicker,
			'p-check': PrettyCheck,
			Multiselect
		},
		created () {
		},
		mounted () {
		},
		data () {
			return {
				form: new Form({
            		firstname: 'John',
					lastname: 'Doe',
					email: 'john.doe@example.com',
					phone: '0123456789',
	        	}),
				// newMember: {
				// 	firstname: 'John',
				// 	lastname: 'Doe',
				// 	email: 'john.doe@example.com',
				// 	phone: '0123456789',
				// },
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			}
		},
		methods: {
			async addNewMember () {
				try {
	                this.$store.commit('loading/SET_LOADING', true)
	                await this.$store.dispatch('members/createMember', this.form)
	            	// const { data } = await this.form.post('/api/members')
	            	// const { data } = await axios.post('/api/members', { newMember: this.form })
	            	// console.log('data: ', data)
	                this.$store.commit('loading/SET_LOADING', false)
	                this.$noty.success('Nouveau membre créé avec succès!')
	                this.$router.push('/admin/members')
	            } catch (error) {
	                this.$store.commit('loading/SET_LOADING', false)
	                this.$noty.error("Une erreur est survenue et le nouveau membre n'a pas pu être créé.")
	            }
			}
		}
	}
</script>

<style scoped>

</style>