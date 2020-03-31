<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Spectacles</li>
		    	<li class="breadcrumb-item active" aria-current="page">Montrer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows"><font-awesome-icon icon="theater-masks" />&nbsp;Spectacles</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows" class="navigation">
				<font-awesome-icon icon="theater-masks" />
				<span>Spectacles</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Spectacle {{ show.name }}</h2>
		<!-- show: {{ show }}<br /><br /> -->

		<b-row class="justify-content-center">
			<b-col cols="12">
				<b-table
			      	responsive="sm"
			      	:items="showArray"
			      	:fields="fields"
			      	:sort-by.sync="sortBy"
			      	:sort-desc.sync="sortDesc"
			   		class="nowrap"
			   		:stacked="true"
			      	v-if="!loading"
			    >	
			    	<template v-slot:cell(members)="row">
			    		<span v-for="(member, index) in row.item.members" :key="member.id">
			    			{{ member.firstname }} {{ member.lastname }} {{ index < row.item.members.length - 1 ? ',' : '' }}
			    		</span>
					</template>
			    	<template v-slot:cell(is_active)="row">
						{{ row.item.is_active ? 'Oui' : 'Non' }}
					</template>
					<template v-slot:cell(start_date)="row">
						{{ row.item.start_date | moment('Do MMMM YYYY') }}
					</template>
					<template v-slot:cell(end_date)="row">
						{{ row.item.end_date | moment('Do MMMM YYYY') }}
					</template>
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
			this.showId = parseInt(this.$route.params.id)
			if (this.$store.getters['shows/shows'].length < 1) {
				await this.$store.dispatch('shows/fetchShows')
			}
		},
		data () {
			return {
				showId: '',
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: false },
					{ key: 'name', label: 'Nom', sortable: false },
					{ key: 'slug', label: 'Slug', sortable: false },
					{ key: 'start_date', label: 'Date de début', sortable: false },
					{ key: 'end_date', label: 'Date de fin', sortable: false },
					{ key: 'season', label: 'Saison', sortable: false },
					{ key: 'members', label: 'Membres', sortable: false },
					{ key: 'is_active', label: 'Est actif?', sortable: false },
					{ key: 'created_at', label: 'Date de création', sortable: false },
					{ key: 'updated_at', label: 'Dernière modification', sortable: false },
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			shows () {
				return this.$store.getters['shows/shows']
			},
			show () {
				return this.$store.getters['shows/shows'].find(show => show.id === this.showId)
			},
			showArray () {
				const array = []
				array.push(this.show)
				return array
			}
		}
	}
</script>

<style scoped>

</style>