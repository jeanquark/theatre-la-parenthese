<template>
	<!-- <div> -->
	<b-container>
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/members"><font-awesome-icon icon="id-card-alt" />&nbsp;Membres</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/members" class="navigation">
				<font-awesome-icon icon="id-card-alt" />
				<span>Membres</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Membre {{ member.firstname }} {{ member.lastname }}</h2>
	
		<!-- memberId: {{ memberId }}<br /><br /> -->
		<!-- members: {{ members }}<br /><br /> -->
		<!-- member: {{ member }}<br /><br /> -->
		<!-- Object.keys(member): {{ Object.keys(member) }}<br /><br /> -->
		<!-- Object.values(member): {{ Object.values(member) }}<br /><br /> -->
		<!-- Object.entries(member): {{ Object.entries(member) }}<br /><br /> -->

		<b-row class="justify-content-center">
			<b-col cols="12">
				<b-table
			      	responsive="sm"
			      	:items="memberArray"
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
			this.memberId = parseInt(this.$route.params.id)
			if (this.$store.getters['members/members'].length < 1) {
				await this.$store.dispatch('members/fetchMembers')
			}
		},
		data () {
			return {
				memberId: '',
				sortBy: 'id',
				sortDesc: true,
				fields: [
					{ key: 'id', label: 'ID', sortable: false },
					{ key: 'firstname', label: 'Prénom', sortable: false },
					{ key: 'lastname', label: 'Nom', sortable: false },
					{ key: 'email', label: 'E-mail', sortable: false },
					{ key: 'phone', label: 'Téléphone', sortable: false },
					{ key: 'created_at', label: 'Date de création', sortable: false },
					{ key: 'updated_at', label: 'Dernière modification', sortable: false },
				]
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading/loading']
			},
			members () {
				return this.$store.getters['members/members']
			},
			member () {
				return this.$store.getters['members/members'].find(member => member.id === this.memberId)
			},
			memberArray () {
				const array = []
				array.push(this.member)
				return array
			}
		}
	}
</script>

<style scoped>

</style>