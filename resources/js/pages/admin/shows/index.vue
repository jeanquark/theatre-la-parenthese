<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Spectacles</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item active><font-awesome-icon icon="theater-masks" />&nbsp;Spectacles</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Spectacles</h2>
		<!-- <router-link to="/admin/shows/create" class="btn btn-primary my-3">Ajouter un nouveau spectacle</router-link> -->
		<b-button variant="primary" class="my-3" to="/admin/shows/create">Créer un nouveau spectacle</b-button>
		<!-- shows: {{ shows }}<br /><br /> -->

		<!--<table class="table">
  			<thead>
    			<tr>
      				<th scope="col">ID</th>
      				<th scope="col">Nom</th>
      				<th scope="col">Slug</th>
      				<th scope="col">Date de début</th>
      				<th scope="col">Date de fin</th>
      				<th scope="col">Date de création</th>
      				<th scope="col">Dernière modification</th>
      				<th scope="col">Actions</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr v-for="show in shows" :key="show.id">
      				<th scope="row">{{ show.id }}</th>
      				<td>{{ show.name }}</td>
      				<td>{{ show.slug }}</td>
      				<td>{{ show.start_date }}</td>
      				<td>{{ show.end_date }}</td>
      				<td>{{ show.created_at }}</td>
      				<td>{{ show.updated_at }}</td>
      				<td>
      					<router-link :to="`/admin/shows/${show.id}`" class="btn btn-warning">
                            <font-awesome-icon icon="eye" />
                        </router-link>
                        <router-link :to="`/admin/shows/${show.id}/edit`" class="btn btn-success">
                            <font-awesome-icon icon="edit" />
                        </router-link>
                        <button class="btn btn-danger" @click="deleteShow(show.id)">
                            <font-awesome-icon icon="trash" />
                        </button>
      				</td>
    			</tr>
  			</tbody>
		</table>-->

		<b-table
	      	responsive="sm"
	      	:items="shows"
	      	:fields="fields"
	      	:sort-by.sync="sortBy"
	      	:sort-desc.sync="sortDesc"
	   		class="nowrap"
	      	v-if="!loading"
	    >
	    	<template v-slot:cell(start_date)="row">
				{{ row.item.start_date | moment('DD MMM YYYY') }}
			</template>
			<template v-slot:cell(end_date)="row">
				{{ row.item.end_date | moment('DD MMM YYYY') }}
			</template>
	    	<template v-slot:cell(updated_at)="row">
				{{ row.item.updated_at | moment('from', 'now') }}
			</template>
	    	<template v-slot:cell(actions)="data">
				<router-link :to="`/admin/shows/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/shows/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deleteShow(data.item.id)">
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
			try {
				if (this.$store.getters['shows/shows'].length < 2) {
					this.$store.getters['loading/SET_LOADING', true]
					await this.$store.dispatch('shows/fetchShows')
					this.$store.getters['loading/SET_LOADING', false]
				}
			} catch (error) {
				console.log('error: ', error)
			}
		},
		data () {
			return {
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: true },
					{ key: 'name', label: 'Nom' ,sortable: true },
					{ key: 'slug', label: 'Slug' ,sortable: true },
					{ key: 'start_date', label: 'Date de début' ,sortable: true },
					{ key: 'end_date', label: 'Date de fin' ,sortable: true },
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
			shows () {
				return this.$store.getters['shows/shows']
			}
		},
		methods: {
			// async deleteShow (showId) {
			// 	try {
			// 		const dialog = await this.$dialog.confirm('Voulez-vous vraiment supprimer ce spectacle?')
			// 		console.log('dialog: ', dialog)
			// 		console.log('deleteShow: ', showId)
			// 		await this.$store.dispatch('shows/deleteShow', { showId })
			// 	} catch (error) {
			// 		console.log('error from front: ', error)
			// 	}
			// },
			async deleteShow (showId) {
				try {
					const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer le spectacle ${showId}?`, {
							okTitle: 'OK',
							cancelTitle: 'Annuler',
						}
					)
			        console.log('value: ', value)
			        if (value) {
			        	await this.$store.dispatch('shows/deleteShow', { showId })
			        	this.$noty.success('Spectacle supprimé avec succès!')
			        }
		    	} catch (error) {
		    		console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et le spectacle n'a pas pu être supprimé.")
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