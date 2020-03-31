<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Plans de salle</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
			<b-breadcrumb-item active><font-awesome-icon icon="chair" />&nbsp;Plans de salle</b-breadcrumb-item>
		</b-breadcrumb>

		<h2 class="text-center mb-3">Plans de salle</h2>
		<!-- plans: {{ plans }}<br /><br /> -->
		<!-- plansArray: {{ plansArray[0] }}<br /><br /> -->

		<b-button to="/admin/plans/create" variant="primary" class="my-3">Créer un nouveau plan</b-button>

		<b-table
	      responsive="sm"
	      :items="plansArray"
	      :fields="fields"
	      :sort-by.sync="sortBy"
	      :sort-desc.sync="sortDesc"
	      class="nowrap"
	      v-if="!loading"
	    >
	    	<template v-slot:cell(performance.date)="row">
				{{ row.item.performance.date | moment('DD MMM YYYY') }}
			</template>

			<template v-slot:cell(filling_rate)="row">
				<b-progress :value="computeFillingRate(row.item.plan_seats)" :max="100" show-value variant="success"></b-progress>
			</template>

	    	<template v-slot:cell(show_details)="row">
				<b-button size="sm" @click="row.toggleDetails" class="mr-2">
					{{ row.detailsShowing ? 'Cacher' : 'Montrer'}} détails
				</b-button>
			</template>
			<template v-slot:cell(actions)="data">
				<router-link :to="`/admin/plans/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/plans/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deletePlan(data.item.id)">
                    <font-awesome-icon icon="trash" />
                </button>
			</template>
			<template v-slot:row-details="row">
				<b-card>
					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Spectacle:</b></b-col>
						<b-col>{{ row.item.performance.show.name }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Représentation:</b></b-col>
						<b-col>{{ row.item.performance.name }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Date:</b></b-col>
						<b-col>{{ row.item.performance.date | moment('dddd Do MMM YYYY HH:mm') }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Nb. tables:</b></b-col>
						<b-col>{{ row.item.plan_tables.length }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Nb. places:</b></b-col>
						<b-col>{{ row.item.plan_seats.length }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Slug:</b></b-col>
						<b-col>{{ row.item.slug }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>SVG id:</b></b-col>
						<b-col>{{ row.item.svg_id }}</b-col>
					</b-row>

					<b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Dernière modification:</b></b-col>
						<b-col>{{ row.item.updated_at | moment('from', 'now') }}</b-col>
					</b-row>

					<b-row class="justify-content-center mb-2">
						<b-button size="sm" @click="row.toggleDetails">Cacher détails</b-button>
					</b-row>
				</b-card>
			</template>
		</b-table>
		<b-row class="justify-content-center" v-if="loading">
			<b-spinner variant="primary" label="Spinning"></b-spinner>
		</b-row>
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {
		layout: 'backend',
		async created () {
			if (Object.entries(this.$store.getters['plans/plans']).length <= 1) {
				this.$store.commit('loading/SET_LOADING', true)
				console.log('fetchPlans')
				await this.$store.dispatch('plans/fetchPlans')
				this.$store.commit('loading/SET_LOADING', false)
			}
			// console.log('abc: ', Object.values(this.$store.getters['plans/plans']))
			
		},
		mounted () {
			// this.arr = Object.keys(this.plans).map((k) => this.plans[k])
		},
		data () {
			return {
				arr: [],
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', sortable: true },
					{ key: 'name', label: 'Nom', sortable: true },
					{ key: 'performance.show.name', label: 'Spectacle', sortable: true },
					{ key: 'performance.date', label: 'Date', sortable: true },
					{ key: 'filling_rate', label: 'Taux de remplissage', sortable: true },
					{
						key: 'show_details',
						label: 'Détails',
						sortable: false
					},
					{ key: 'actions', sortable: false }
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			plans () {
				return this.$store.getters['plans/plans']
			},
			plansArray () {
				// return Object.values(this.$store.getters['plans/plans'])
				// return Object.values(this.plans)
				// return []
				// return Object.keys(this.plans).map((key) => {
				// 	return this.plans[key]
				// })
				const array = []
				for (let key in this.plans) {
					if (this.plans.hasOwnProperty(key) && this.plans[key] != null) {
						array.push(this.plans[key])
					}
				}
				return array
			}
		},
		methods: {
			computeFillingRate (seats) {
				// console.log('computeFillingRate: ', seats)
				if (seats.length > 0) {
					return (seats.filter(seat => seat.is_reserved).length) / seats.length * 100
				} else {
					return 0
				}
			},
			async deletePlan (planId) {
				try {
					const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer le plan ${planId} et toutes les tables et les sièges qui lui sont liés?`, {
							okTitle: 'OK',
							cancelTitle: 'Annuler',
						}
					)
			        console.log('value: ', value)
			        if (value) {
			        	await this.$store.dispatch('plans/deletePlan', { planId })
			        	this.$noty.success('Plan de salle supprimé avec succès!')
			        }
		    	} catch (error) {
		    		console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et le plan de salle n'a pas pu être supprimé.")
		    	}
			}
		}
	}
</script>

<style scoped>
	.table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left) {
		vertical-align: middle;
	}
	.inline-block {
		display: inline-block;
	}
	.nowrap {
        white-space:nowrap;
    }
	/*>>>.table.b-table > thead > tr > th {*/
	/*.table th {
		vertical-align: middle;
	}
	>>>.table td {
		vertical-align: middle;
	}*/
</style>

<style>
	/*.table.b-table > thead > tr > th {
		vertical-align: middle;
	}*/
</style>