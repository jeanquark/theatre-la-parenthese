<template>
	<!-- <div> -->
    <b-container>
        <!-- <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/admin/plans"><font-awesome-icon icon="chair" />&nbsp;Plans de salle</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Montrer</li>
            </ol>
        </nav> -->
        <!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans"><font-awesome-icon icon="chair" />&nbsp;Plans de salle</b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb> -->

        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans" class="navigation">
                <font-awesome-icon icon="chair" />
                <span>Plans de salle</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>

		<h2 class="text-center">Plan</h2>
		<!-- plan: {{ plan }}<br /><br /> -->
		<!-- svgFile: {{ svgFile }}<br /><br /> -->

		<b-row class="justify-content-center my-3">
			<b-col cols="6" v-if="plan">
				<!-- <img :src="`/images/svg/plans/${loadedPlan.svg_id}.svg`" width="100%" class="" style="border: 1px solid orangered;" /> -->
				<!-- <img :src="`/images/svg/plans/plan_13.svg`" width="100%" class="" style="border: 1px solid orangered;" /> -->
				<!-- <svg-vue 
					:icon="`plans/${loadedPlan.svg_id}`"
					style="border: 1px solid yellow;"
				></svg-vue> -->
                <div v-html="svgFile" class="primary-border" v-if="svgFile"></div>
			</b-col>
		</b-row>

        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-table
                    responsive="sm"
                    :items="planArray"
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

		<!--<table class="table" v-if="loadedPlan">
  			<thead>
    			<tr>
      				<th scope="col">Champ</th>
      				<th scope="col">Valeur</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr>
      				<th scope="row">ID</th>
      				<td>{{ loadedPlan.id }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Name</th>
      				<td>{{ loadedPlan.name }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Slug</th>
      				<td>{{ loadedPlan.slug }}</td>
    			</tr>
    			<tr>
      				<th scope="row">SVG ID</th>
      				<td>{{ loadedPlan.svg_id }}</td>
    			</tr>
    			<tr v-if="loadedPlan.plan_tables">
      				<th scope="row">Nb. de tables</th>
      				<td>{{ loadedPlan.plan_tables.length }}</td>
    			</tr>
    			<tr v-if="loadedPlan.plan_seats">
      				<th scope="row">Nb. de places</th>
      				<td>{{ loadedPlan.plan_seats.length }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Créé le</th>
      				<td>{{ loadedPlan.created_at | moment('DD MMMM YYYY HH:mm') }}</td>
    			</tr>
    			<tr>
      				<th scope="row">Dernière modification</th>
      				<td>{{ loadedPlan.updated_at | moment('DD MMMM YYYY HH:mm') }}</td>
    			</tr>
  			</tbody>
		</table>-->
	<!-- </div> -->
    </b-container>
</template>

<script>
	// import { BModal, VBModal } from 'bootstrap-vue'
	// import axios from 'axios'
	export default {
        components: {
            // BModal, VBModal
        },
		async created () {
			try {
                this.planId = parseInt(this.$route.params.id)
                // console.log('planId: ', planId)
                // if (!this.$store.getters['plans/plans'][this.planId]) {
                    const { svgPlan } = await this.$store.dispatch('plans/fetchPlanById', { planId: this.planId })
                // }
                    this.svgFile = svgPlan
            } catch (error) {
                this.$noty.error("Une erreur s'est produite et le plan de table n'a pas pu être récupéré.")
            }
        },
        // async mounted () {
		// 	try {
        //         const planSVG = `plan_${this.planId}.svg`
        //         const { data } = await axios.post(`/api/plans/svg`, { planSVG })
        //         console.log('data: ', data)
        //         this.svgFile = data.svgPlan
        //     } catch (error) {
        //         this.$noty.error("Le plan de table n'a pas pu être récupéré.")
        //     }
		// },
		data () {
			return {
                planId: '',
				svgFile: null,
                sortBy: 'id',
                sortDesc: true,
                fields: [
                    { key: 'id', label: 'ID', sortable: false },
                    { key: 'name', label: 'Nom', sortable: false },
                    { key: 'slug', label: 'Slug', sortable: false },
                    { key: 'svg_id', label: 'SVG ID', sortable: false },
                    { key: 'performance.name', label: 'Représentation', sortable: false },
                    { key: 'created_at', label: 'Date de création', sortable: false },
                    { key: 'updated_at', label: 'Dernière modification', sortable: false },
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
            plan () {
                return this.$store.getters['plans/plans'][this.planId]
            },
            planArray () {
                const array = []
                array.push(this.plan)
                return array
            }
		}
	}
</script>

<style lang="scss" scoped>
	@import './resources/sass/_variables.scss';
	.primary-border {
		border: 2px solid $primary;
	}
</style>