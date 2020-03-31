<template>
	<!-- <div class="container"> -->
    <b-container>
        <!-- <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Représentations</li>
              <li class="breadcrumb-item active" aria-current="page">Montrer</li>
            </ol>
        </nav> -->
        <!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances"><font-awesome-icon icon="calendar-day" />&nbsp;Représentations</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb> -->

        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances" class="navigation">
            <font-awesome-icon icon="calendar-day" />
            <span>Représentations</span>
        </b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center my-2">Représentation</h2>
		<!-- performance: {{ performance }}<br /><br /> -->

        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-table
                    responsive="sm"
                    :items="performanceArray"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    class="nowrap"
                    :stacked="true"
                    v-if="!loading"
                >
                    <template v-slot:cell(date)="row">
                        {{ row.item.date | moment('Do MMMM YYYY') }}
                    </template>
                    <template v-slot:cell(is_sold_out)="row">
                        {{ row.item.is_sold_out ? 'Oui' : 'Non' }}
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

		<!--<table class="table">
  			<thead>
    			<tr>
      				<th scope="col">Champ</th>
      				<th scope="col">Valeur</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr>
      				<th scope="row">ID</th>
      				<td>{{ loadedPerformance.id }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Date</th>
      				<td>{{ loadedPerformance.date | moment('dddd, Do MMMM YYYY HH:mm') }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Lieu</th>
      				<td>{{ loadedPerformance.location }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Complet?</th>
      				<td>{{ loadedPerformance.is_sold_out }}</td>
    			</tr>
    			<tr v-if="loadedPerformance.show">
      				<th scope="row">Spectacle</th>
      				<td>{{ loadedPerformance.show.name }}</td>
    			</tr>
    			<tr v-if="loadedPerformance.plan">
      				<th scope="row">Plan</th>
      				<td>{{ loadedPerformance.plan.id }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Créé le</th>
      				<td>{{ loadedPerformance.created_at | moment('DD MMMM YYYY HH:mm') }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Dernière modification</th>
      				<td>{{ loadedPerformance.updated_at | moment('DD MMMM YYYY HH:mm') }}</td>
    			</tr>
  			</tbody>
		</table>-->
	<!-- </div> -->
  </b-container>
</template>

<script>
	export default {
		async created () {
			this.performanceId = parseInt(this.$route.params.id)
			// console.log('performanceId: ', performanceId)
            if (!this.$store.getters['performances/performances'][this.performanceId]) {
                await this.$store.dispatch('performances/fetchPerformanceById', { planId: this.planId })
            }
			// await this.$store.dispatch('performances/fetchPerformanceById', { performanceId: this.performanceId })
        },
		data () {
			return {
                performanceId: '',
                sortBy: 'id',
                sortDesc: true,
                fields: [
                    { key: 'id', label: 'ID', sortable: false },
                    { key: 'name', label: 'Nom', sortable: false },
                    { key: 'slug', label: 'Slug', sortable: false },
                    { key: 'date', label: 'Date', sortable: false },
                    { key: 'location', label: 'Lieu', sortable: false },
                    { key: 'is_sold_out', label: 'Est complet?', sortable: false },
                    { key: 'show.name', label: 'Spectacle', sortable: false },
                    { key: 'created_at', label: 'Date de création', sortable: false },
                    { key: 'updated_at', label: 'Dernière modification', sortable: false },
                ]
			}
		},
		computed: {
            loading () {
                return this.$store.getters['loading/loading']
            },
			performance () {
				return this.$store.getters['performances/performances'][this.performanceId]
			},
            performanceArray () {
                const array = []
                array.push(this.performance)
                return array
            }
		}
	}
</script>

<style scoped>

</style>