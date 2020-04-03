<template>
<b-container>
    <b-row class="justify-content-center">
        <!-- <div> -->
        <!-- loadedPerformances: {{ loadedPerformances }}<br /><br /> -->
        <!-- loadedPerformance: {{ loadedPerformance }}<br /><br /> -->
        <!-- loadedPlan: {{ loadedPlan }}<br /><br /> -->
        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
        <!-- tableSeats: {{ tableSeats }}<br /><br /> -->
        <!-- loadedPlan['plan_seats']: {{ loadedPlan['plan_seats'] }}<br /><br /> -->

        <b-col cols="12">
            <!-- <div class="text-center"> -->
                <h3 class="text-center">Représentation du&nbsp;</h3>
                <h3 class="text-center" v-if="loadedPerformance">{{ loadedPerformance.date | moment('dddd Do MMMM YYYY [à] HH:mm') }}</h3>
            <!-- </div> -->
        </b-col>
    </b-row>
        <!-- <div class="row justify-content-center my-5" v-if="loadedPerformance && loadedPerformance.plan"> -->
        <!-- <b-col cols="12" md="8" class="my-5" @click="clickOnTablePlan($event)" v-if="loadedPerformance && loadedPerformance.plan">
        </b-col> -->
    <b-row class="justify-content-center">
        <b-col cols="12" md="8" class="my-5" @click="clickOnTablePlan($event)" v-if="loadedPlan">
            <div ref="svgFile" v-html="loadedPlan.svg_plan" class="primary-border"></div>
            <!-- <div class="primary-border">
                <svg
                    data-v-11cabfaa=""
                    viewBox="0 0 270.933 203.2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="tables_plan"
                    version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs"
                >
                    <path d="M11.204 203.542c11.172-14.902 13.685-35.666 50.154-36.52l153.261-.005c23.026-.366 33.593 20.384 46.28 36.525z" id="stage" fill="#743d00" fill-opacity="1"></path>
                    <text
                        xml:space="preserve"
                        style="line-height:1.25"
                        x="99.087"
                        y="192.698"
                        id="text821"
                        font-style="normal"
                        font-weight="400"
                        font-size="40"
                        font-family="sans-serif"
                        letter-spacing="0"
                        word-spacing="0"
                        fill="#000"
                        fill-opacity="1"
                        stroke="none"
                        svgjs:data='{"leading":"1.3"}'
                    >
                        <tspan id="tspan819" x="99.087" y="192.698" font-size="21.333" fill="#fff" fill-opacity="1">Scène</tspan>
                    </text>

                    <g id="nvv8oa5ma_group" class="table">
                        <circle id="nvv8oa5ma_table" r="7.1513225" cx="135.4665" cy="101.6" data-svg-model="table_round_4_seats" data-total-seats="4" data-table-number="01"></circle>
                        <text id="nvv8oa5ma_text" font-family="Helvetica, Arial, sans-serif" svgjs:data='{"leading":"1.3"}'>
                            <tspan id="nvv8oa5ma_span" font-family="Helvetica" font-size="10" dx="129.4665" dy="104.6" fill="#9acd32" family="Helvetica" size="10">01</tspan>
                        </text>
                    </g>
                    <defs id="SvgjsDefs1020"></defs>
                </svg>
            </div> -->
        </b-col>
        <!-- </div> -->

        <!-- <modal2 :selectedTable="selectedTable" @updateTableColor="updateTableColor" @closeModal="showModal = false" v-if="showModal" /> -->

        <modal :selectedTable="selectedTable" @updateTableColor="updateTableColor" v-if="loadedPlan" />
    </b-row>
</b-container>
</template>

<script>
import moment from 'moment'
import Modal from '~/components/Modal'
// import Modal2 from '~/components/Modal2'
export default {
    components: { Modal },
    layout: 'frontend',
    async created() {
        
    },
    async mounted() {
        try {
            const performanceId = parseInt(this.$route.params.id)
            console.log('performanceId: ', performanceId)

            if (!this.$store.getters['performances/performances'][performanceId]) {
                await this.$store.dispatch('performances/fetchPerformanceById', { performanceId })
            }

            // Remove all pre-reservations that are out of date
            // await this.$store.dispatch('planSeats/deleteOutOfDateSeatPreReservations', { planId: performanceId })

            await this.$store.dispatch('plans/fetchPlanById', { planId: performanceId })
            if (SVG.supported) {
                for (const table of this.planTables) {
                    // console.log('table: ', table)


                    const tableSvgId = table.svg_id
                    // console.log('tableSvgId: ', tableSvgId)
                    const totalSeats = table.total_seats
                    // console.log('totalSeats: ', totalSeats)
                    let reservedSeats = 0
                    for (const seat of this.tableSeats[table.id]) {
                        // Remove pre-reservation if out of date
                        if (seat.status === 'pre_reservation') {
                            console.log('DELETE_PAST_PRE_RESERVATIONS')
                            const updated_at = moment(seat.updated_at)
                            const now = moment().format('YYYY-MM-DD HH:mm:ss')
                            const elapsed_time = Math.abs(updated_at.diff(now)/1000)
                            console.log('elapsed_time: ', elapsed_time)
                            const sixHours = 6 * 60 * 60
                            if (elapsed_time > sixHours) {
                                await this.$store.dispatch('planSeats/deletePlanSeatPreReservation', { planSeatId: seat.id })
                            }
                        }

                        const tableElement = SVG.get(`${tableSvgId}_group`)
                        // console.log('tableElement from reservations/_id/index: ', tableElement)
                        if (seat.is_reserved) {
                            reservedSeats += 1
                        }
                        if (tableElement) {
                            if (totalSeats - reservedSeats <= 2) {
                                tableElement.fill('#FFA500')
                            }
                            if (totalSeats - reservedSeats < 1) {
                                tableElement.fill('#FF0000')
                                tableElement.removeClass('table')
                            }
                        }
                    }
                }
            }
            // }

            this.listenToBroadcastedEvents()
        } catch (error) {
            console.log('error: ', error)
            this.$noty.error("Nous sommes désolés. Le plan de salle n'a pas pu être récupéré. Veuillez contacter le webmaster si le problème persiste.")
        }
    },
    data() {
        return {
            showModal: false,
            selectedPlan: {},
            selectedTable: {},
            // planId: ''
            svgFile: null,
            reservationConfirmationCountdown: parseInt(process.env.MIX_RESERVATION_COUNTDOWN || 720)
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
        planTables() {
            return this.loadedPlan['plan_tables']
        },
        loadedPlanSeats() {
            return this.$store.getters['planSeats/planSeats']
            // const seats = this.$store.getters['planSeats/planSeats']
            // return Object.keys(seats).filter(function(key) {
            //     // Countries under 1000000000
            //     return seats[key]['plan_table_id'] === 3;
            // });
        },
        tableSeats() {
            // Create object with tableId => seats format
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
                for (const table of this.planTables) {
                    console.log('table: ', table)
                    const tableSvgId = table.svg_id
                    // console.log('tableSvgId: ', tableSvgId)
                    const totalSeats = table.total_seats
                    // console.log('totalSeats: ', totalSeats)
                    let reservedSeats = 0
                    for (const seat of this.tableSeats[table.id]) {
                        console.log('seat: ', seat)
                        // console.log('tableSvgId: ', tableSvgId)

                        const tableElement = SVG.get(`${tableSvgId}_group`)
                        console.log('tableElement from [WATCH] loadedPlan reservations/_id/index: ', tableElement)
                        if (seat.is_reserved) {
                            reservedSeats += 1
                        }
                        if (tableElement) {
                            if (totalSeats - reservedSeats <= 2) {
                                tableElement.fill('#FFA500')
                            }
                            if (totalSeats - reservedSeats < 1) {
                                tableElement.fill('#FF0000')
                                tableElement.removeClass('table')
                            }
                        }
                    }
                }
            }
        }
        // loadedPlan3() {
        //     console.log('[WATCHER] loadedPlan watcher called from reservation page!')
        //     if (SVG.supported) {
        //         let index = 0
        //         for (const table in this.tableSeats) {
        //             const reservedSeats = 0
        //             const totalSeats = this.loadedPlan['plan_tables'][index]['total_seats']
        //             const tableSvgId = this.loadedPlan['plan_tables'][index]['svg_id']
        //             console.log('tableSvgId: ', tableSvgId)
        //             for (const seat of this.tableSeats[table]) {
        //                 const tableElement = SVG.get(`${tableSvgId}_group`)
        //                 console.log('tableElement: ', tableElement)
        //                 if (seat.is_reserved) {
        //                     reservedSeats += 1
        //                 }
        //                 if (tableElement) {
        //                     if (totalSeats - reservedSeats <= 2) {
        //                         tableElement.fill('#FFA500')
        //                     }
        //                     if (totalSeats - reservedSeats < 1) {
        //                         tableElement.fill('#FF0000')
        //                         tableElement.removeClass('table')
        //                     }
        //                 }
        //             }
        //             index++
        //         }
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
::v-deep .table:hover {
    cursor: pointer;
    fill: $primary;
}
.primary-border {
    border: 2px solid $primary;
}
</style>
