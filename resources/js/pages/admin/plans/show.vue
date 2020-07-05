<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans" class="navigation">
                <font-awesome-icon icon="chair" />
                <span>Plans de salle</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Montrer</b-breadcrumb-item>
        </b-breadcrumb>

        <h2 class="text-center">Plan</h2>
        <!-- plan: {{ plan }}<br /><br /> -->
        <!-- plan['plan_seats']: {{ plan['plan_seats'] }}<br /><br /> -->
        <!-- svgFile2: {{ svgFile }}<br /><br /> -->

        <b-row class="justify-content-center my-3">
            <b-col cols="6" v-if="plan">
                <!-- <img :src="`/images/svg/plans/${plan.svg_id}.svg`" width="100%" class="primary-border" /> -->
                <div ref="svgFile" v-html="this.plan['svg_plan']" class="primary-border"></div>
            </b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-table responsive="sm" :items="planArray" :fields="planHeader" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" class="nowrap" :stacked="true" v-if="!loading">
                    <template v-slot:cell(created_at)="row">
                        {{ row.item.created_at | moment('Do MMMM YYYY') }}
                    </template>
                    <template v-slot:cell(updated_at)="row">
                        {{ row.item.updated_at | moment('from', 'now') }}
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col cols="12" class="my-2">
                <h3 class="text-center">Liste des sièges sur ce plan:</h3>
            </b-col>
            <b-col cols="12">
                <b-table responsive="sm" :items="plan['plan_seats']" :fields="planSeatsHeader" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" class="nowrap" v-if="!loading">
                    <template v-slot:cell(is_reserved)="row">
                        <span class="text-success" v-if="row.item.is_reserved">
                            Oui
                        </span>
                        <span class="text-danger" v-else>
                            Non
                        </span>
                    </template>
                    <template v-slot:cell(price)="row">
                        {{ (row.item['price'] / 100).toFixed(2) }}
                    </template>
                    <template v-slot:cell(table)="row">
                        {{ plan.plan_tables.find(table => table.id === parseInt(row.item.plan_table_id))['table_number'] }}
                    </template>
                    <template v-slot:cell(updated_at)="row">
                        {{ row.item.updated_at | moment('from', 'now') }}
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    components: {},
    async created() {
        try {
            this.planId = parseInt(this.$route.params.id)
            console.log('planId: ', this.planId)
            // if (!this.$store.getters['plans/plans'][this.planId]) {
                await this.$store.dispatch('plans/fetchPlanById', { planId: this.planId })
            // }
        } catch (error) {
            this.$noty.error("Une erreur s'est produite et le plan de table n'a pas pu être récupéré.")
        }
    },
    async mounted() {
        // try {
        //     this.planId = parseInt(this.$route.params.id)
        //     console.log('planId: ', planId)
        //     // if (!this.$store.getters['plans/plans'][this.planId]) {
        //     const { svgPlan } = await this.$store.dispatch('plans/fetchPlanById', { planId: this.planId })
        //     // }
        //     this.svgFile = svgPlan
        // } catch (error) {
        //     this.$noty.error("Une erreur s'est produite et le plan de table n'a pas pu être récupéré.")
        // }
    },
    data() {
        return {
            planId: '',
            svgFile: null,
            sortBy: 'id',
            sortDesc: true,
            planHeader: [
                { key: 'id', label: 'ID', sortable: false },
                { key: 'name', label: 'Nom', sortable: false },
                { key: 'slug', label: 'Slug', sortable: false },
                { key: 'svg_id', label: 'SVG ID', sortable: false },
                { key: 'performance.name', label: 'Représentation', sortable: false },
                { key: 'created_at', label: 'Date de création', sortable: false },
                { key: 'updated_at', label: 'Dernière modification', sortable: false }
            ],
            planSeatsHeader: [
                { key: 'id', label: 'ID', sortable: false },
                { key: 'seat_number', label: 'Numéro', sortable: true },
                { key: 'table', label: 'N° Table', sortable: true },
                { key: 'is_reserved', label: 'Réservé?', sortable: true },
                { key: 'status', label: 'Statut', sortable: true },
                { key: 'price', label: 'Tarif', sortable: true },
                { key: 'updated_at', label: 'Dernière modification', sortable: true }
            ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        plans() {
            return this.$store.getters['plans/plans']
        },
        plan() {
            return this.$store.getters['plans/plans'][this.planId]
        },
        planArray() {
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
