<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Représentations</li>
		    	<li class="breadcrumb-item active" aria-current="page">Créer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances"><font-awesome-icon icon="calendar-day" />&nbsp;Représentations</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances" class="navigation">
				<font-awesome-icon icon="calendar-day" />
				<span>Représentations</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Ajouter nouvelle représentation</h2>

		<!-- performances: {{ performances }}<br /><br /> -->
		<!-- newPerformance: {{ newPerformance }}<br /><br /> -->
		<!-- shows: {{ shows }}<br /><br /> -->

		<b-form @submit.prevent="addNewPerformance" >
			<b-row align-v="center" class="justify-content-start my-3 px-3">
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer un nom pour ce spectacle:" label-for="newPerformanceName">
	                    <b-form-input id="newPerformanceName" placeholder="Nom de la représentation" v-model="newPerformance.name"></b-form-input>
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer un lieu pour ce spectacle:" label-for="newPerformanceLocation">
	                    <b-form-input id="newPerformanceLocation" placeholder="Lieu de la représentation" v-model="newPerformance.location"></b-form-input>
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	                <b-form-group label="Entrer une date:" label-for="newPerformanceDate">
	                    <VueCtkDateTimePicker label="Cliquer pour choisir une date" format="YYYY-MM-DD" formatted="YYYY-MM-DD" color="#9ACD32" button-color="#9ACD32" button-now-translation="Aujourd'hui" only-date id="newPerformanceDate" v-model="newPerformance.date" />
	                </b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	            	<b-form-group label="Sélectionner le spectacle:" label-for="newPerformanceShow">
	            		<!-- <b-form-select id="newPerformanceShow" :options="shows" value-field="id" text-field="name" v-model="newPerformance.show_id"></b-form-select> -->
	            		<!-- <b-form-select id="newPerformanceShow" v-model="newPerformance.show">
  							<option v-for="show in shows" :value="show" :key="show.id">{{ show.name }}</option>
						</b-form-select> -->
	            	</b-form-group>
	            </b-col>
	            <b-col cols="12" md="6">
	            	<b-form-checkbox
						id="newPerformanceIsSoldOut"
						v-model="newPerformance.is_sold_out"
					>
						La représentation est {{ newPerformance.is_sold_out ? 'complète' : 'libre' }}
					</b-form-checkbox>
				</b-col>
        	</b-row>
        	<b-row class="justify-content-center my-2">
                <b-button variant="primary" type="submit" :disabled="loading || !newPerformance.show_id">
					<b-spinner small type="grow" v-if="loading"></b-spinner>
                	Créer la représentation
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
			if (Object.entries(this.$store.getters['performances/performances']).length <= 1) {
				await this.$store.dispatch('performances/fetchPerformances')
			}
			if (this.$store.getters['shows/shows'].length < 1) {
				await this.$store.dispatch('shows/fetchShows')
			}
		},
		data () {
			return {
				newPerformance: {
					show_id: '',
					// show: {},
					name: 'ABC',
					date: '2020-02-25',
					location: 'Beausobre, Morges',
					is_sold_out: false,
				}
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			shows () {
				return this.$store.getters['shows/shows']
			},
			performances () {
				return this.$store.getters['performances/performances']
			}
		},
		methods: {
			async addNewPerformance () {
				try {
					console.log('addNewPerformance: ', this.newPerformance)
					this.$store.commit('loading/SET_LOADING', true)
					await this.$store.dispatch('performances/createPerformance', { newPerformance: this.newPerformance })
					this.$store.commit('loading/SET_LOADING', false)
					this.$noty.success('Nouveau spectacle créé avec succès.')
					this.$router.push('/admin/performances')
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