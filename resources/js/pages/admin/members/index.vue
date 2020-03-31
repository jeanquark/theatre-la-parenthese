<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Membres</li>
		  	</ol>
		</nav> -->
		<b-breadcrumb>
            <b-breadcrumb-item active><font-awesome-icon icon="id-card-alt" />&nbsp;Membres</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Membres de la troupe</h2>
		<!-- <router-link to="/admin/members/create" class="btn btn-primary my-3">Ajouter un nouveau membre</router-link> -->
		<b-button variant="primary" class="my-3" to="/admin/members/create">Créer un nouveau membre</b-button>
		<!-- members: {{ members }}<br /><br /> -->
		
		<b-table
	      	responsive="sm"
	      	:items="members"
	      	:fields="fields"
	      	:sort-by.sync="sortBy"
	      	:sort-desc.sync="sortDesc"
	   		class="nowrap"
	      	v-if="!loading"
	    >
	    	<template v-slot:cell(updated_at)="row">
				{{ row.item.updated_at | moment('from', 'now') }}
			</template>
	    	<template v-slot:cell(actions)="data">
				<router-link :to="`/admin/members/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/members/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deleteMember(data.item.id)">
                    <font-awesome-icon icon="trash" />
                </button>
			</template>
		</b-table>
		<b-row class="justify-content-center" v-if="loading">
			<b-spinner variant="primary" label="Spinning"></b-spinner>
		</b-row>


		<!--<table class="table">
  			<thead>
    			<tr>
      				<th scope="col">ID</th>
      				<th scope="col">Prénom</th>
      				<th scope="col">Nom</th>
      				<th scope="col">Email</th>
      				<th scope="col">Téléphone</th>
      				<th scope="col">Date de création</th>
      				<th scope="col">Dernière modification</th>
      				<th scope="col">Actions</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr v-for="member in members" :key="member.id">
      				<th scope="row">{{ member.id }}</th>
      				<td>{{ member.firstname }}</td>
      				<td>{{ member.lastname }}</td>
      				<td>{{ member.email }}</td>
      				<td>{{ member.phone }}</td>
      				<td>{{ member.created_at }}</td>
      				<td>{{ member.updated_at }}</td>
      				<td>
      					<router-link :to="`/admin/members/${member.id}`" class="btn btn-warning">
                            <font-awesome-icon icon="eye" />
                        </router-link>
                        <router-link :to="`/admin/members/${member.id}/edit`" class="btn btn-success">
                            <font-awesome-icon icon="edit" />
                        </router-link>
                        <button class="btn btn-danger" @click="deleteMember(member.id)">
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
			try {
				if (this.$store.getters['members/members'].length < 2) {
					this.$store.commit('loading/SET_LOADING', true)
					await this.$store.dispatch('members/fetchMembers')
					this.$store.commit('loading/SET_LOADING', false)
				}
			} catch (error) {
				console.log('error2: ', error)
				this.$store.commit('loading/SET_LOADING', false)
			}
		},
		data () {
			return {
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: true },
					{ key: 'firstname', label: 'Prénom' ,sortable: true },
					{ key: 'lastname', label: 'Nom' ,sortable: true },
					{ key: 'email', label: 'E-mail' ,sortable: true },
					{ key: 'phone', label: 'Téléphone' ,sortable: true },
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
			members () {
				return this.$store.getters['members/members']
			}
		},
		methods: {
			async deleteMember (memberId) {
				try {
					const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer le membre ${memberId}?`, {
							okTitle: 'OK',
							cancelTitle: 'Annuler',
						}
					)
			        console.log('value: ', value)
			        if (value) {
			        	await this.$store.dispatch('members/deleteMember', { memberId })
			        	this.$noty.success('Membre supprimé avec succès!')
			        }
		    	} catch (error) {
		    		console.log('error: ', error)
					this.$noty.error("Une erreur est survenue et le membre n'a pas pu être supprimée.")
		    	}
				// try {
				// 	const dialog = await this.$dialog.confirm('Voulez-vous vraiment supprimer ce membre?')
				// 	console.log('dialog: ', dialog)
				// 	console.log('deleteMember: ', memberId)
				// 	await this.$store.dispatch('members/deleteMember', { memberId })
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