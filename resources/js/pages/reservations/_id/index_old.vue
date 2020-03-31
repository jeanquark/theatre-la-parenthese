<template>
    <b-row class="justify-content-center">
        <!-- <div> -->
        <!-- loadedPerformances: {{ loadedPerformances }}<br /><br /> -->
        <!-- loadedPerformance: {{ loadedPerformance }}<br /><br /> -->
        <!-- loadedPlan: {{ loadedPlan }}<br /><br /> -->
        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
        <!-- loadedTableSeats: {{ loadedTableSeats }}<br /><br /> -->
        <!-- loadedPlan['plan_seats']: {{ loadedPlan['plan_seats'] }}<br /><br /> -->

        <h3 class="text-center">ReprÃ©sentation du&nbsp;</h3>
        <br />
        <h3 class="text-center" v-if="loadedPerformance">{{ loadedPerformance.date | moment('dddd Do MMMM YYYY [Ã ] HH:mm') }}</h3>
        <!-- <div class="row justify-content-center my-5" v-if="loadedPerformance && loadedPerformance.plan"> -->
        <b-col cols="12" md="8" class="my-5" @click="clickOnTablePlan($event)" v-if="loadedPerformance && loadedPerformance.plan">
            <svg-vue :icon="`plans/${loadedPerformance.plan.svg_id}`" style="border: 1px solid orange;"></svg-vue>
        </b-col>
        <!-- </div> -->

        <!-- <modal2 :selectedTable="selectedTable" @updateTableColor="updateTableColor" @closeModal="showModal = false" v-if="showModal" /> -->

        <!-- <b-modal id="seat-modal" hide-footer>
                <template v-slot:modal-title> Using <code>$bvModal</code> Methods </template>
                <div class="d-block text-center">
                    <h3>Hello From This Modal!</h3>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('seat-modal')">Close Me</b-button>
            </b-modal> -->
        <modal :selectedTable="selectedTable" @updateTableColor="updateTableColor" v-if="loadedPlan" />
        <!-- </div> -->
    </b-row>
</template>

<script>
import Modal from '~/components/Modal'
// import Modal2 from '~/components/Modal2'
export default {
    components: { Modal },
    layout: 'frontend',
    async created() {},
    async mounted() {
        try {
            const performanceId = parseInt(this.$route.params.id)
            console.log('performanceId: ', performanceId)

            if (!this.$store.getters['performances/performances'][performanceId]) {
                await this.$store.dispatch('performances/fetchPerformanceById', { performanceId })
            }

            // if (!this.$store.getters['plans/plans'][performanceId]) {
                await this.$store.dispatch('plans/fetchPlan', { planId: performanceId })
            // }


            this.listenToBroadcastedEvents()
        } catch (error) {
            console.log('error: ', error)
            this.$noty.error("Une erreur est survenue sur cette page. Si l'erreur persiste, veuillez contacter le webmaster.")
        }
    },
    data() {
        return {
            showModal: false,
            selectedPlan: {},
            selectedTable: {}
            // planId: ''
        }
    },
    computed: {
        loadedPerformances() {
            return this.$store.getters['performances/performances']
        },
        loadedPerformance() {
            return this.$store.getters['performances/performances'][parseInt(this.$route.params.id)]
        },
        loadedPlans() {
            return this.$store.getters['plans/plans']
        },
        loadedPlan() {
            return this.$store.getters['plans/plans'][parseInt(this.$route.params.id)]
        },
        loadedPlanSeats() {
            return this.$store.getters['planSeats/planSeats']
            // const seats = this.$store.getters['planSeats/planSeats']
            // return Object.keys(seats).filter(function(key) {
            //     // Countries under 1000000000
            //     return seats[key]['plan_table_id'] === 3;
            // });
        },
        loadedTableSeats() {
            if (this.loadedPlan) {
                return this.loadedPlan['plan_seats'].reduce((acc, curr) => {
                    if (!acc[curr.plan_table_id]) acc[curr.plan_table_id] = [] //If this type wasn't previously stored
                    acc[curr.plan_table_id].push(curr)
                    return acc
                }, {})
            }
            return {}
        }
    },
    methods: {
        listenToBroadcastedEvents() {
            this.$echo.channel('update-table-seat').listen('UpdateTableSeat', payload => {
                console.log('{EVENT BROADCAST] update table seat channel: ', payload)
                const { updatedSeat } = payload
                this.$store.commit('plans/UPDATE_PLAN', updatedSeat, { root: true })
            })
        },
        async clickOnTablePlan(event) {
            try {
                console.log('clickOnTablePlan: ', event)
                const tableId = event.target.id
                // console.log('tableId: ', tableId)

                const tableSvgId = tableId.substring(0, tableId.indexOf('_'))
                // console.log('tableSvgId: ', tableSvgId)

                const element = SVG.get(`${tableSvgId}_group`)
                // console.log('element: ', element)
                // console.log("element.hasClass('table'): ", element.hasClass('table'))

                if (element && element.hasClass('table')) {
                    // // if (tableSvgId) {
                    // const { data } = await axios.get(`api/plan-tables/${tableSvgId}`)
                    // const { data } = await this.$store.dispatch('planTables/fetchSeatsByTable', { tableSvgId })
                    // console.log('data: ', data)
                    //        			// console.log('data.seats: ', data.seats)
                    // 	// this.selectedTable = data
                    // 	// this.selectedTable = this.loadedPlanSeats
                    this.selectedTable = this.loadedPlan['plan_tables'].find(table => table.svg_id === tableSvgId)
                    this.showModal = true
                    this.$bvModal.show('seat-modal')
                } else {
                    this.selectedTable = null
                }
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error('Une erreur est survenue. Veuillez nous excuser.')
            }
        },
        updateTableColor(data) {
            console.log('updateTableColor: ', data)
            const { table_svg_id, color } = data
            const element = SVG.get(table_svg_id)
            element.fill(color)
        }
    },
    watch: {
        loadedPlan() {
            console.log('[WATCHER] loadedPlan watcher called from reservation page!')
            if (SVG.supported) {
                let index = 0
                for (const table in this.loadedTableSeats) {
                    const reservedSeats = 0
                    const totalSeats = this.loadedPlan['plan_tables'][index]['total_seats']
                    const tableSvgId = this.loadedPlan['plan_tables'][index]['svg_id']
                    console.log('tableSvgId: ', tableSvgId)
                    for (const seat of this.loadedTableSeats[table]) {
                        const tableElement = SVG.get(`${tableSvgId}_group`)
                        // console.log('tableElement: ', tableElement)
                        if (seat.is_reserved) {
                            reservedSeats += 1
                        }
                        if (totalSeats - reservedSeats <= 2) {
                            tableElement.fill('#FFA500')
                        }
                        if (totalSeats - reservedSeats < 1) {
                            tableElement.fill('#FF0000')
                            tableElement.removeClass('table')
                        }
                    }
                    index++
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
::v-deep .table:hover {
    cursor: pointer;
    fill: $primary;
}
</style>