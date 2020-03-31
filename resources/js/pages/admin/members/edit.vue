<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/members"><font-awesome-icon icon="chair" />&nbsp;Membres</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Editer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/members"><font-awesome-icon icon="id-card-alt" />&nbsp;Membres</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/members" class="navigation">
				<font-awesome-icon icon="id-card-alt" />
				<span>Membres</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
        
		<h2 class="text-center">Editer un membre</h2>
		<!-- memberId: {{ memberId }}<br /><br /> -->
		<!-- member: {{ member }}<br /><br /> -->


		<form @submit.prevent="updateMember" v-if="member && member.id">
			<div class="form-row p-3">
				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="firstname">Prénom</label>
				    	<input type="text" class="form-control" id="firstname" placeholder="" v-model="member.firstname">
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="lastname">Nom</label>
				    	<input type="text" class="form-control" id="lastname" placeholder="" v-model="member.lastname">
				  	</div>
				</div>

				<div class="col-12 col-md-6">
				  	<div class="form-group">
				    	<label for="email">E-mail</label>
				    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="" v-model="member.email">
				  	</div>
				</div>
				<div class="col-12 col-md-6">
				  	<div class="form-group">
					    <label for="phone">Téléphone</label>
				    	<input type="text" class="form-control" id="phone" placeholder="" v-model="member.phone">
				  	</div>
				</div>
			</div>

			<div class="row my-3">
				<div class="col-12 text-center">
		  			<button type="submit" class="btn btn-primary">Editer ce membre</button>
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
			if (this.$store.getters['members/members'].length < 1) {
				this.$store.dispatch('members/fetchMembers')
			}
		},
		async mounted () {
			this.memberId = this.$route.params.id
			const memberId = parseInt(this.$route.params.id)
			console.log('memberId: ', memberId)
			await this.$store.dispatch('members/fetchMember', { memberId })
		},
		data () {
			return {
				memberId: null,
			}
		},
		computed: {
			members () {
				return this.$store.getters['members/members']
			},
			member () {
				return this.$store.getters['members/member']
			}
		},
		methods: {
			async updateMember () {
				try {
	                await this.$store.dispatch('members/updateMember', { member: this.member })
					this.$router.push('/admin/members')
				} catch (error) {
					console.log('error: ', error)
				}
			}
		}
	}
</script>

<style scoped>

</style>