<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Utilisateurs</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item active><font-awesome-icon icon="users" />&nbsp;Utilisateurs</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Utilisateurs</h2>
		<!-- users: {{ users }}<br /><br /> -->
		<b-button variant="primary" class="my-3" to="/admin/users/create">Créer un nouvel utilistateur</b-button>
		
		<b-table
	      	responsive="sm"
	      	:items="users"
	      	:fields="fields"
	      	:sort-by.sync="sortBy"
	      	:sort-desc.sync="sortDesc"
	   		class="nowrap"
	      	v-if="!loading"
	    >
	    	<template v-slot:cell(role)="row">
	    		<!-- {{ row.item }} -->
				{{ row.item.roles[0].name }}
			</template>

	    	<template v-slot:cell(updated_at)="row">
				{{ row.item.updated_at | moment('from', 'now') }}
			</template>
	    	<template v-slot:cell(actions)="data">
	    		<b-button variant="info" @click="updateUserRole(data.item, 'admin')" v-if="data.item.roles[0].slug === 'user'">
	    			Devenir Admin
	    		</b-button>
	    		<b-button variant="info" @click="updateUserRole(data.item, 'user')" v-if="data.item.roles[0].slug === 'admin'">
	    			Devenir Utilisateur
	    		</b-button>
				<router-link :to="`/admin/users/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/users/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <b-button variant="danger" @click="deleteUser(data.item.id)">
                    <font-awesome-icon icon="trash" />
                </b-button>
			</template>
		</b-table>
		<b-row class="justify-content-center" v-if="loading">
			<b-spinner variant="primary" label="Spinning"></b-spinner>
		</b-row>

		<!--<table class="table">
  			<thead>
    			<tr>
      				<th scope="col">ID</th>
      				<th scope="col">Email</th>
      				<th scope="col">Date de création</th>
      				<th scope="col">Dernière modification</th>
      				<th scope="col">Actions</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr v-for="user in users" :key="user.id">
      				<th scope="row">{{ user.id }}</th>
      				<td>{{ user.email }}</td>
      				<td>{{ user.created_at }}</td>
      				<td>{{ user.updated_at }}</td>
      				<td>
      					<router-link :to="`/admin/users/${user.id}`" class="btn btn-warning">
                            <font-awesome-icon icon="eye" />
                        </router-link>
                        <router-link :to="`/admin/users/${user.id}/edit`" class="btn btn-success">
                            <font-awesome-icon icon="edit" />
                        </router-link>
                        <button class="btn btn-danger" @click="deleteUser(user.id)">
                            <font-awesome-icon icon="trash" />
                        </button>
      				</td>
    			</tr>
  			</tbody>
		</table>-->
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {
		layout: 'backend',
		async created () {
			if (this.$store.getters['users/users'].length < 1) {
				this.$store.commit('loading/SET_LOADING', true)
				await this.$store.dispatch('users/fetchUsers')
				this.$store.commit('loading/SET_LOADING', false)
			}
		},
		data () {
			return {
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: true },
					{ key: 'email', label: 'Email' ,sortable: true },
					{ key: 'role', label: 'Role', sortable: true },
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
			users () {
				return this.$store.getters['users/users']
			}
		},
		methods: {
			async updateUserRole (user, newRole) {
				try {
					console.log('updateUserRole: ', user, newRole)
					await this.$store.dispatch('users/updateUser', { user, newRole })
                    this.$noty.success('Utilisateur mis à jour avec succès!')
				} catch (error) {
					console.log('error: ', error)
                    this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être mis à jour.")
				}
			},
			async deleteUser (userId) {
				try {
					const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer l utilisateur ${userId}?`, {
							okTitle: 'OK',
							cancelTitle: 'Annuler',
						}
					)
			        console.log('value: ', value)
			        if (value) {
			        	await this.$store.dispatch('users/deleteUser', { userId })
			        	this.$noty.success('Utilisateur supprimée avec succès!')
			        }
		    	} catch (error) {
		    		console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être supprimé.")
		    	}
				// try {
				// 	const dialog = await this.$dialog.confirm('Voulez-vous vraiment supprimer cet utilisateur?')
				// 	console.log('dialog: ', dialog)
				// 	console.log('deleteUser: ', userId)
				// 	await this.$store.dispatch('users/deleteUser', { userId })
				// } catch (error) {
				// 	console.log('error from front: ', error)
				// }
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