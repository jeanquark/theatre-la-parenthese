<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Représentations</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item active><font-awesome-icon icon="calendar-day" />&nbsp;Représentations</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Représentations</h2>
		<!-- <router-link to="/admin/performances/create" class="btn btn-primary my-3">Ajouter une nouvelle représentation</router-link> -->
		<!-- performances: {{ performances }}<br /><br /> -->
		<b-button variant="primary" class="my-3" to="/admin/performances/create">Créer une nouvelle représentation</b-button>

		<!--<table class="table">
  			<thead>
    			<tr>
      				<th scope="col">ID</th>
      				<th scope="col">Nom</th>
      				<th scope="col">Slug</th>
      				<th scope="col">Date</th>
      				<th scope="col">Date de création</th>
      				<th scope="col">Dernière modification</th>
      				<th scope="col">Actions</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr v-for="performance in performances" :key="performance.id">
      				<th scope="row">{{ performance.id }}</th>
      				<td>
      					<router-link :to="`/admin/performances/${performance.id}`">
      						{{ performance.name }}
      					</router-link>
      				</td>
      				<td>{{ performance.slug }}</td>
      				<td>{{ performance.date }}</td>
      				<td>{{ performance.created_at }}</td>
      				<td>{{ performance.updated_at }}</td>
      				<td>
      					<router-link :to="`/admin/performances/${performance.id}`" class="btn btn-warning">
                            <font-awesome-icon icon="eye" />
                        </router-link>
                        <router-link :to="`/admin/performances/${performance.id}/edit`" class="btn btn-success">
                            <font-awesome-icon icon="edit" />
                        </router-link>
                        <button class="btn btn-danger" @click="deletePerformance(performance.id)">
                            <font-awesome-icon icon="trash" />
                        </button>
      				</td>
    			</tr>
  			</tbody>
		</table>-->
		<b-table
	      	responsive="sm"
	      	:items="performancesArray"
	      	:fields="fields"
	      	:sort-by.sync="sortBy"
	      	:sort-desc.sync="sortDesc"
	   		class="nowrap"
	      	v-if="!loading"
	    >
	    	<template v-slot:cell(name)="row">
				<router-link :to="`/admin/performances/${row.item.id}`">
					{{ row.item.name }}
				</router-link>
			</template>
			<template v-slot:cell(date)="row">
				{{ row.item.date | moment('DD MMM YYYY') }}
			</template>
	    	<template v-slot:cell(updated_at)="row">
				{{ row.item.updated_at | moment('from', 'now') }}
			</template>
	    	<template v-slot:cell(actions)="data">
				<router-link :to="`/admin/performances/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/performances/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deletePerformance(data.item.id)">
                    <font-awesome-icon icon="trash" />
                </button>
			</template>
		</b-table>
		<b-row class="justify-content-center" v-if="loading">
			<b-spinner variant="primary" label="Spinning"></b-spinner>
		</b-row>
	<!-- </div> -->
	</b-container>
</template>

<script>
	// import axios from 'axios'
	export default {
		layout: 'backend',
		async created () {
			// if (this.$store.getters['performances/performances'].length < 1) {
			if (Object.entries(this.$store.getters['performances/performances']).length <= 1) {
				this.$store.getters['loading/SET_LOADING', true]
				await this.$store.dispatch('performances/fetchPerformances')
				this.$store.getters['loading/SET_LOADING', false]
			}
		},
		data () {
			return {
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: true },
					{ key: 'name', label: 'Nom' ,sortable: true },
					// { key: 'slug', label: 'Slug' ,sortable: true },
					{ key: 'date', label: 'Date' ,sortable: true },
					// { key: 'created_at', label: 'Date de création', sortable: true },
					{ key: 'updated_at', label: 'Dernière modification', sortable: true },
					{ key: 'actions', sortable: false }
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			performances () {
				return this.$store.getters['performances/performances']
			},
			performancesArray () {
				const array = []
				for (let key in this.performances) {
					if (this.performances.hasOwnProperty(key) && this.performances[key] != null) {
						array.push(this.performances[key])
					}
				}
				return array
			}
		},
		methods: {
			async deletePerformance (performanceId) {
				try {
					const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer la représentation ${performanceId}?`, {
							okTitle: 'OK',
							cancelTitle: 'Annuler',
						}
					)
			        console.log('value: ', value)
			        if (value) {
			        	await this.$store.dispatch('performances/deletePerformance', { performanceId })
			        	this.$noty.success('Représentation supprimée avec succès!')
			        }
		    	} catch (error) {
		    		console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et la représentation n'a pas pu être supprimée.")
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
</style>