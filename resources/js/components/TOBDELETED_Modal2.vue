<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" style="overflow-y: auto; max-height: 400px;">
                    <div class="modal-body" style="border: 0px dashed red; margin: 0px;">
                        <div class="justify-content-center" v-if="seatReserved">
                            <router-link to="/mon-panier">Voir mon panier &rarr;</router-link>
                        </div>
                        <!-- loadedPlan['plan_seats']: {{ loadedPlan['plan_seats'] }}<br /><br /> -->
                        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
                        <b-alert show variant="warning" v-if="!loadedUser"
                            >Vous n'êtes pas connecté. <router-link :to="`/login?redirect=reservations/${this.$route.params.id}`">Login</router-link>.
                        </b-alert>
                        <div class="" id="drawing" @click="selectSeat($event)">
                            <h3 class="text-center">Choisissez vos places:</h3>
                            <svg-vue :icon="`models/model_${selectedTable.svg_model}`"></svg-vue>
                        </div>
                        <div>
                            <p>
                                En <span style="color: red;"><b>rouge</b></span
                                >: siège occupé. En <b>noir</b>: siège libre.
                            </p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-primary" @click="$emit('closeModal')">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
// window.Echo.channel('home').listen('NewMessage', (e) => { console.log(e) })
import axios from 'axios'
import SVG from 'svg.js'
// import * as types from '../store/mutation-types'
export default {
    props: ['selectedTable'],
    created: {},
    async created() {
        // const { data } = await axios.get(`/api/tables/${this.table.id}`)
        // console.log('data: ', data)
        // // const seats = data
        // if (SVG.supported && data.seats) {
        //     console.log('SVG supported!')
        //     data.seats.forEach(seat => {
        //         console.log('seat: ', seat)
        //         const element = SVG.get(seat.svg_seat_id)
        //         console.log('element: ', element)
        //         if (element) {
        //             element.fill('#FF0000')
        //         }
        //     })
        // } else {
        //     // alert('SVG not supported')
        // }
        // console.log('this.selectedTable.seats: ', this.selectedTable.seats)
        // console.log('SVG.supported: ', SVG.supported)
        // console.log('SVG("drawing"): ', SVG('drawing'))
        // this.selectedTable.seats.forEach(seat => {
        //     // console.log('seat: ', seat)
        //     console.log('seat.svg_seat_id: ', seat.svg_seat_id)
        //     // const element = SVG.get(seat.svg_seat_id)
        //     // const element = SVG.get('table_dizr67932_seat_1')
        //     const element = SVG.get('table_dizr67932')
        //     console.log('element: ', element)
        //     // if (element) {
        //     //     element.fill('#FF0000')
        //     // }
        // })
    },
    mounted() {
        if (SVG.supported) {
            console.log('SVG.supported: ', SVG.supported)
            this.loadedPlan['plan_seats']
                .filter(seat => seat.plan_table_id === this.selectedTable.id)
                .forEach(seat => {
                    // console.log('seat: ', seat)
                    const seatSvg = seat.svg_id.match(/seat\d*/gm)[0]
                    // console.log('seatSvg: ', seatSvg)
                    const seatElement = SVG.get(`${seatSvg}`)
                    // console.log('seatElement: ', seatElement)
                    const textElement = SVG.get(`${seatSvg}_text`)
                    // console.log('textElement: ', textElement)

                    if (textElement) {
                        textElement.plain(seat.seat_number)
                    }
                    if (seatElement && seat.is_reserved) {
                        seatElement.fill('#FF0000')
                        seatElement.removeClass('seat')
                    }
                })
        }
        // console.log('SVG("drawing"): ', SVG('drawing'))
        // Fetch all seats for this table
        // this.$store.dispatch('tableSeats/fetchTableSeats', { tableSvgId: this.selectedTable.table.svg_id })
        // if (SVG.supported) {
        //     this.loadedTableSeats.forEach(seat => {
        //         // console.log('seat: ', seat)
        //         const element = SVG.get(seat.svg_seat_id)
        //         // console.log('element: ', element)
        //         if (element && seat.is_reserved) {
        //             element.fill('#FF0000')
        //             element.removeClass('seat')
        //         }
        //     })
        // }
    },
    data() {
        return {
            selectedSeat: '',
            seatReserved: false
        }
    },
    computed: {
        loadedPlans() {
            return this.$store.getters['plans/plans']
        },
        loadedPlan() {
            return this.$store.getters['plans/plans'][parseInt(this.$route.params.id)]
            // return this.$store.getters['plans/plans'].filter(plan => plan.id === this.selectedTable.plan_id)
        },
        // loadedPlanSeats () {
        //     return this.$store.getters['plans/plan']['plan_seats']
        // },
        loadedUser() {
            return this.$store.getters['auth/user']
        },
        loadedTableSeats() {
            return []
            // return this.$store.getters['plans/plan']['plan_seats'].filter(seat => seat.plan_table_id === this.selectedTable.id)
        },
        loadedTest() {
            return this.$store.getters['tableSeats/tests']
        },
        loadedPlanSeats() {
            return this.$store.getters['planSeats/planSeats']
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
        async selectSeat(event) {
            try {
                console.log('selectSeat: ', event)
                if (!this.loadedUser) {
                    this.$noty.warning('Veuillez vous connecter afin de pouvoir effectuer une réservation.')
                    return
                }
                const seat = event.target.id
                console.log('seat: ', seat)
                const seatSvgId = seat.substring(0, seat.indexOf('_'))
                // const seatSvgId = seat.match(/\d+/g)[0]
                console.log('seatSvgId: ', seatSvgId)

                // const planTableId = this.selectedTable.id
                // console.log('planTableId: ', planTableId)
                // const seatSvgId = event.target.id
                // console.log('seatSvgId: ', seatSvgId)
                // this.selectedSeat = seatSvgId
                // const element = SVG.get(seatSvgId)
                const element = SVG.get(`${seatSvgId}_group`)

                console.log('element: ', element)
                // return
                let is_seat = false
                if (element) {
                    is_seat = element.hasClass('seat')
                }
                // Place seat in "reserved" state in DB
                if (is_seat) {
                    // await this.$store.dispatch('tableSeats/reserveASeat', { planTableId, seatSvgId })
                    this.seatReserved = true
                    this.$noty.success('La place a été ajoutée à votre panier!')



                    // console.log('data: ', data)

                    // console.log(seat)
                    // const { data } = await axios.post('api/reserve-a-seat', { seatId })

                    // console.log('data: ', data)
                    // element.fill('#FF0000')
                    // element.removeClass('seat')

                    // this.$store.commit('planSeats/addUserSeat', data.seat)
                    // this.$store.commit('planTables/updateTableSeat', { table: this.selectedTable.table, seat: data.seat })
                    // const table_svg_id = this.selectedTable.table.svg_id
                    // const total_seats = this.selectedTable.table.total_seats
                    // const reserved_seats = this.$store.getters['planTables/tableSeats'][table_svg_id].filter(seat => seat.is_reserved == true)
                    // console.log('total_seats: ', total_seats)
                    // console.log('reserved_seats: ', reserved_seats)
                    // if (reserved_seats.length >= total_seats) {
                    //     this.$emit('updateTableColor', { table_svg_id, color: '#FF0000' })
                    // } else if (total_seats - reserved_seats.length <= 2) {
                    //     this.$emit('updateTableColor', { table_svg_id, color: '#FFA500'})
                    // }
                }
            } catch (error) {
                console.log('error: ', error)
                if (error.response.status === 409) {
                    this.$noty.error('Nous sommes désolés, mais ce siège est déjà réservé.')
                } else if (error.response.status === 401) {
                    this.$noty.warning('Veuillez vous logger avant de réserver une place.')
                    this.unauthenticated = true
                    // this.$router.push('/login')
                    this.$router.push({ name: 'login', query: { redirect: `/reservations/${this.$route.params.id}` } })
                } else {
                    this.$noty.error("Nous sommes désolés, une erreur est survenue et le siège n'a pas pu être réservé")
                }
            }
        }
    },
    watch: {
        loadedPlans() {
            console.log('[WATCHER] loadedPlans watcher called from modal!')
        },
        loadedPlan() {
            console.log('[WATCHER] loadedPlan watcher called from modal!')
            if (SVG.supported) {
                this.loadedPlan['plan_seats'].forEach(seat => {
                    // console.log('seat: ', seat)
                    const element = SVG.get(seat.svg_id)
                    // console.log('element: ', element)
                    if (element && seat.is_reserved) {
                        element.fill('#FF0000')
                        element.removeClass('seat')
                    }
                })
            }
        },
        loadedPlanSeats() {
            console.log('[WATCHER] loadedPlanSeats watcher called from modal!')
        }
        // loadedPlanSeats () {
        //     console.log('loadedPlanSeats watcher called from modal!')
        // },
        // loadedTableSeats () {
        //     console.log('loadedTableSeats watcher!')
        //     if (SVG.supported) {
        //         this.loadedTableSeats.forEach(seat => {
        //             console.log('seat: ', seat)
        //             const element = SVG.get(seat.svg_seat_id)
        //             console.log('element: ', element)
        //             if (element && seat.is_reserved) {
        //                 element.fill('#FF0000')
        //                 element.removeClass('seat')
        //             }
        //         })
        //     }
        // }
    }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
// ::v-deep .seat:hover {
//     cursor: pointer;
//     fill: $primary;
// }
// ::v-deep .seat:hover + .seat-number:hover {
//     cursor: pointer;
//     fill: #fff;
// }
::v-deep .seat:hover {
    cursor: pointer;
    fill: $primary;
}
</style>
