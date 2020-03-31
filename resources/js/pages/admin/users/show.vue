<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item"><router-link to="/admin/users"><font-awesome-icon icon="chair" />&nbsp;Utilisateurs</router-link></li>
		    	<li class="breadcrumb-item active" aria-current="page">Utilisateur</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users"><font-awesome-icon icon="users" />&nbsp;Utilisateurs</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb> -->

        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/users" class="navigation">
				<font-awesome-icon icon="users" />
				<span>Utilisateurs</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Utilisateur {{ user.firstname }} {{ user.lastname }}</h2>

		<!-- user: {{ user }}<br /><br /> -->

		<b-row class="justify-content-center">
			<b-col cols="12">
				<b-table
			      	responsive="sm"
			      	:items="userArray"
			      	:fields="fields"
			      	:sort-by.sync="sortBy"
			      	:sort-desc.sync="sortDesc"
			   		class="nowrap"
			   		:stacked="true"
			      	v-if="!loading"
			    >
			    	<template v-slot:cell(created_at)="row">
						{{ row.item.created_at | moment('Do MMMM YYYY') }}
					</template>
					<template v-slot:cell(updated_at)="row">
						{{ row.item.updated_at | moment('from', 'now') }}
					</template>
				</b-table>
			</b-col>
		</b-row>
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {
		layout: 'backend',
		async created () {
			this.userId = parseInt(this.$route.params.id)
			if (this.$store.getters['users/users'].length < 1) {
				await this.$store.dispatch('users/fetchUsers')
			}
		},
		data () {
			return {
				userId: '',
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: false },
					{ key: 'firstname', label: 'Prénom', sortable: false },
					{ key: 'lastname', label: 'Nom', sortable: false },
					{ key: 'email', label: 'E-mail', sortable: false },
					{ key: 'created_at', label: 'Date de création', sortable: false },
					{ key: 'updated_at', label: 'Dernière modification', sortable: false },
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			users () {
				return this.$store.getters['users/users']
			},
			user () {
				return this.$store.getters['users/users'].find(user => user.id === this.userId)
			},
			userArray () {
				const array = []
				array.push(this.user)
				return array
			}
		}
	}
</script>

<style scoped>

</style>