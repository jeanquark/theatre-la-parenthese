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
        <!-- svgFile2: {{ svgFile }}<br /><br /> -->

        <b-row class="justify-content-center my-3">
            <b-col cols="6" v-if="plan">
                <!-- <img :src="`/images/svg/plans/${loadedPlan.svg_id}.svg`" width="100%" class="" style="border: 1px solid orangered;" /> -->
                <img :src="`/images/svg/plans/${plan.svg_id}.svg`" width="100%" class="primary-border" />
                <!-- <svg-vue 
					:icon="`plans/${loadedPlan.svg_id}`"
					style="border: 1px solid yellow;"
				></svg-vue> -->
                <!-- <div v-html="svgFile" class="primary-border" v-if="svgFile"></div> -->
            </b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-table responsive="sm" :items="planArray" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" class="nowrap" :stacked="true" v-if="!loading">
                    <template v-slot:cell(created_at)="row">
                        {{ row.item.created_at | moment('Do MMMM YYYY') }}
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
            if (!this.$store.getters['plans/plans'][this.planId]) {
                await this.$store.dispatch('plans/fetchPlanById', { planId: this.planId })
            }
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
            fields: [
                { key: 'id', label: 'ID', sortable: false },
                { key: 'name', label: 'Nom', sortable: false },
                { key: 'slug', label: 'Slug', sortable: false },
                { key: 'svg_id', label: 'SVG ID', sortable: false },
                { key: 'performance.name', label: 'Représentation', sortable: false },
                { key: 'created_at', label: 'Date de création', sortable: false },
                { key: 'updated_at', label: 'Dernière modification', sortable: false }
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
