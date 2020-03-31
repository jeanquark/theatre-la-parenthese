<template>
	<div class="container">
		<nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" /> Plans de salle</li>
		  	</ol>
		</nav>
		<h2 class="text-center">Plans</h2>
		<!-- <router-link to="/admin/performances/create" class="btn btn-primary my-3">Ajouter une nouvelle représentation</router-link> -->
		<!-- plans: {{ plans }}<br /><br /> -->
		plansArray: {{ plansArray[0] }}<br /><br />

		<b-table
	      responsive
	      :items="plansArray"
	      :fields="fields"
	      :sort-by.sync="sortBy"
	      :sort-desc.sync="sortDesc"
	      class="nowrap"
	    >
			<!-- <template v-slot:cell(show)="data">
		        {{ data.item.performance.show_id }}
		    </template>
		    <template v-slot:cell(performance)="data">
		        {{ data.item.performance.name }}
		    </template> -->

		    <template v-slot:cell(performance.date)="data">
				{{ data.item.performance.date | moment('dddd Do MMM YYYY HH:mm') }}
		    </template>
		    <template v-slot:cell(nb_tables)="data">
		        {{ data.item.plan_tables.length }}
		    </template>
		    <template v-slot:cell(nb_seats)="data">
		        {{ data.item.plan_seats.length }}
		    </template>
			<template v-slot:cell(updated_at)="data">
				{{ data.item.updated_at | moment('from', 'now') }}
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
		</b-table>

	    <div>
      		Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      		<b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    	</div>

		<!-- <table class="table">
  			<thead>
    			<tr>
      				<th scope="col">ID</th>
      				<th scope="col">Nom</th>
      				<th scope="col">Slug</th>
      				<th scope="col">SVG ID</th>
      				<th scope="col">Spectacle</th>
      				<th scope="col">Représentation</th>
      				<th scope="col">Nb. de tables</th>
      				<th scope="col">Nb. de places</th>
      				<th scope="col">Dernière modification</th>
      				<th scope="col">Actions</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr v-for="plan in plans" :key="plan.id">
      				<th scope="row">{{ plan.id }}</th>
      				<td>
      					<router-link :to="`/admin/plans/${plan.id}`">
      						{{ plan.name }}
      					</router-link>
      				</td>
      				<td>{{ plan.slug }}</td>
      				<td>{{ plan.svg_id }}</td>
      				<td>{{ plan.performance.show_id }}</td>
      				<td>{{ plan.performance.name }}</td>
      				<td>{{ plan.plan_tables.length }}</td>
      				<td>{{ plan.plan_seats.length }}</td>
      				<td>{{ plan.updated_at | moment('from', 'now') }}</td>
      				<td>
      					<router-link :to="`/admin/plans/${plan.id}`" class="btn btn-warning">
                            <font-awesome-icon icon="eye" />
                        </router-link>
                        <router-link :to="`/admin/plans/${plan.id}/edit`" class="btn btn-success">
                            <font-awesome-icon icon="edit" />
                        </router-link>
                        <button class="btn btn-danger" @click="deletePlan(plan.id)">
                            <font-awesome-icon icon="trash" />
                        </button>
      				</td>
    			</tr>
  			</tbody>
		</table> -->
	</div>
</template>

<script>
	// import axios from 'axios'
	export default {
		layout: 'backend',
		async created () {
			if (this.$store.getters['plans/plans']) {
				await this.$store.dispatch('plans/fetchPlans')
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
				sortDesc: false,
				fields: [
					{ key: 'id', sortable: true },
					{ key: 'name', label: 'Nom', sortable: true },
					{ key: 'slug', sortable: true },
					{ key: 'svg_id', sortable: false },
					{ key: 'performance.show.name', label: 'Spectacle', sortable: true },
					{ key: 'performance.name', label: 'Représentation', sortable: true },
					{ key: 'performance.date', label: 'Date', sortable: true },
					{ key: 'nb_tables', label: 'Nb. tables', sortable: true },
					{ key: 'nb_seats', label: 'Nb. places', sortable: true },
					{ key: 'updated_at', label: 'Dernière modification', sortable: true },
					{ key: 'actions', sortable: false }
				],
				// fields2: [
				// 	{ key: 'last_name', sortable: true },
				// 	{ key: 'first_name', sortable: true },
				// 	{ key: 'age', sortable: true },
				// 	{ key: 'isActive', sortable: false }
				// ],
				// items: [
				// 	{ isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
				// 	{ isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
				// 	{ isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
				// 	{ isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
				// ]
			}
		},
		computed: {
			plans () {
				return this.$store.getters['plans/plans']
			},
			plansArray () {
				return Object.values(this.$store.getters['plans/plans'])
			}
		},
		methods: {
			async deletePlan (performanceId) {
				try {
					// const dialog = await this.$dialog.confirm('Voulez-vous vraiment supprimer ce spectacle?')
					// console.log('dialog: ', dialog)
					// console.log('deletePerformance: ', performanceId)
					// await this.$store.dispatch('performances/deletePerformance', { performanceId })
					this.$noty.success('Plan de tables supprimé avec succès.')
				} catch (error) {
					console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et le plan de tables n'a pas pu être supprimé.")
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
	/*>>>.table.b-table > thead > tr > th {*/
	.table th {
		vertical-align: middle;
	}
	>>>.table td {
		vertical-align: middle;
	}
	.nowrap {
        white-space:nowrap;
    }
</style>

<style>
	/*.table.b-table > thead > tr > th {
		vertical-align: middle;
	}*/
</style>