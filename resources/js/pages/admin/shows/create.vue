<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Spectacles</li>
		    	<li class="breadcrumb-item active" aria-current="page">Créer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows"><font-awesome-icon icon="theater-masks" />&nbsp;Spectacles</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows" class="navigation">
				<font-awesome-icon icon="theater-masks" />
				<span>Spectacles</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>

		<h2 class="text-center">Créer nouveau spectacle</h2>
		<!-- newShow: {{ this.newShow }}<br /><br /> -->
		<!-- members: {{ members }}<br /><br /> -->

		<b-form @submit.prevent="addNewShow" >
			<b-row class="justify-content-start my-3 px-3">
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer un nom pour ce spectacle:" label-for="newShowName">
	                    <b-form-input id="newShowName" placeholder="Nom du spectacle" v-model="newShow.name"></b-form-input>
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	                <b-form-group label="Saison:" label-for="newShowSeason">
	                    <b-form-input type="number" id="newShowSeason" placeholder="2020" v-model="newShow.season"></b-form-input>
	                </b-form-group>
	            </b-col>
	        </b-row>

	        <b-row align-v="center" class="justify-content-start my-3 px-3">
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer une date de début:" label-for="newShowStartDate">
	                    <VueCtkDateTimePicker label="Cliquer pour choisir une date" format="YYYY-MM-DD" formatted="YYYY-MM-DD" color="#9ACD32" button-color="#9ACD32" button-now-translation="Aujourd'hui" only-date id="newShowStartDate" v-model="newShow.start_date" />
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer une date de fin:" label-for="newShowEndDate">
	                    <VueCtkDateTimePicker label="Cliquer pour choisir une date" format="YYYY-MM-DD" formatted="YYYY-MM-DD" color="#9ACD32" button-color="#9ACD32" button-now-translation="Aujourd'hui" only-date id="newShowEndDate" v-model="newShow.end_date" />
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	            	<b-form-group label="Sélectionner les membres:" label-for="newShowMembers">
	            		<b-form-select id="newShowMembers" multiple :options="members" value-field="id" text-field="firstname" v-model="newShow.members"></b-form-select>
	            	</b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	            	<b-form-checkbox
						id="newShowIsActive"
						v-model="newShow.is_active"
					>
						Le spectacle est {{ newShow.is_active ? 'actif' : 'inactif' }}
					</b-form-checkbox>
				</b-col>
        	</b-row>
        	<b-row class="justify-content-center my-2">
                <b-button variant="primary" type="submit" :disabled="loading">
					<b-spinner small type="grow" v-if="loading"></b-spinner>
                	Créer le spectacle
                </b-button><br />
            </b-row>
	    </b-form>
	<!-- </div> -->
	</b-container>
</template>

<script>
	// Vue date time picker
	import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
	import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

	export default {
		components: { VueCtkDateTimePicker },
		async created () {
			if (this.$store.getters['members/members'].length < 1) {
				await this.$store.dispatch('members/fetchMembers')
			}
		},
		data () {
			return {
				newShow: {
					name: 'ABC',
					start_date: '2020-02-25',
					end_date: '2020-02-26',
					season: '2020',
					is_active: false,
					members: []
				}
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			members () {
				return this.$store.getters['members/members']
			}
		},
		methods: {
			async addNewShow () {
				try {
					console.log('addNewShow: ', this.newShow)
					this.$store.commit('loading/SET_LOADING', true)
					await this.$store.dispatch('shows/createShow', { newShow: this.newShow })
					this.$store.commit('loading/SET_LOADING', false)
					this.$noty.success('Nouveau spectacle créé avec succès.')
					this.$router.push('/admin/shows')
				} catch (error) {
					this.$store.commit('loading/SET_LOADING', false)
					this.$noty.error("Une erreur est survenue et le nouveau spectacle n'a pas pu être crée.")
				}
			}
		}
	}
</script>

<style scoped>

</style>