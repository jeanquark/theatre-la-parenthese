<template>
    <b-modal id="seat-modal" hide-footer>
        <template v-slot:modal-title
            >Réservez vos places:
            <span class="primary-color">Table {{ selectedTable.table_number }}</span>
        </template>
        <!-- loadedPlan: {{ loadedPlan }}<br /><br /> -->
        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
        <!-- loadedTableSeats: {{ loadedTableSeats }}<br /><br /> -->
        <!-- abc: {{ abc }}<br /><br /> -->

        <!-- <b-alert show variant="warning" v-if="!loadedUser">Il faut être connecté pour effectuer une reservation. <router-link :to="`/login?redirect=reservations/${this.$route.params.id}`">Se connecter</router-link>.</b-alert> -->
        <b-row class="justify-content-center" v-if="seatReserved">
            <router-link to="/mon-panier">Voir mon panier &rarr;</router-link>
        </b-row>
        <div id="drawing" @click="selectSeat($event)" v-if="selectedTable">
            <!-- <h3 class="text-center">Choisissez vos places:</h3> -->
            <svg-vue :icon="`models/model_${selectedTable.svg_model}`"></svg-vue>
        </div>
        <div>
            <p>
                En <span style="color: red;"><b>rouge</b></span
                >: siège occupé. En <b>noir</b>: siège libre.
            </p>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('seat-modal')">Fermer</b-button>
    </b-modal>
</template>

<script>
// window.Echo.channel('home').listen('NewMessage', (e) => { console.log(e) })
import axios from 'axios'
import SVG from 'svg.js'
// import * as types from '../store/mutation-types'
export default {
    props: ['selectedTable'],
    created: {},
    async created() {},
    mounted() {
        console.log('Modal mounted() lifecycle hook called')
        this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
            // console.log('Modal is about to be shown', bvEvent, modalId)
            if (SVG.supported && this.loadedPlan && this.selectedTable) {
                // console.log('SVG.supported: ', SVG.supported)
                this.loadedPlan['plan_seats']
                    .filter(seat => seat.plan_table_id === this.selectedTable.id)
                    .forEach(seat => {
                        // console.log('seat: ', seat)
                        // const seatSvg = seat.svg_id.match(/seat\d*/gm)[0]
                        const seatSvg = seat.svg_id.substring(seat.svg_id.lastIndexOf('_') + 1)
                        // console.log('seatSvg: ', seatSvg)
                        const groupElement = SVG.get(`${seatSvg}_group`)
                        const seatElement = SVG.get(`${seatSvg}_path`)
                        // const seatElement = SVG.get('seat01_path')
                        // console.log('seatElement from modal: ', seatElement)
                        const textElement = SVG.get(`${seatSvg}_text`)
                        // console.log('textElement from modal: ', textElement)

                        if (textElement) {
                            textElement.plain(seat.seat_number)
                        }
                        if (seatElement && seat.is_reserved) {
                            seatElement.fill('#FF0000')
                            groupElement.removeClass('seat')
                        }
                    })
            }
        })
    },
    data() {
        return {
            selectedSeat: '',
            seatReserved: false,
            reservationConfirmationCountdown: parseInt(process.env.MIX_RESERVATION_COUNTDOWN || 720)

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
        loadedUser() {
            return this.$store.getters['auth/user']
        },
        loadedPlanSeats() {
            return this.$store.getters['planSeats/planSeats']
        },
        loadedTableSeats() {
            if (this.loadedPlan) {
                const allTablesSeats = this.loadedPlan['plan_seats'].reduce((acc, curr) => {
                    if (!acc[curr.plan_table_id]) acc[curr.plan_table_id] = [] //If this type wasn't previously stored
                    acc[curr.plan_table_id].push(curr)
                    return acc
                }, {})
                return allTablesSeats[this.selectedTable.id]
            }
            return {}
        }
    },
    methods: {
        async selectSeat(event) {
            try {
                console.log('selectSeat: ', event)
                // if (!this.loadedUser) {
                //     this.$noty.warning('Veuillez vous connecter afin de pouvoir effectuer une réservation.')
                //     return
                // }
                const seat = event.target.id
                // console.log('seat: ', seat)

                const seatSvgId = seat.substring(0, seat.indexOf('_'))
                // console.log('seatSvgId: ', seatSvgId)

                const planTableId = this.selectedTable.id
                // console.log('planTableId: ', planTableId)
                const tableSvgId = this.selectedTable.svg_id
                // console.log('tableSvgId: ', tableSvgId)
                // const seatSvgId = event.target.id
                // console.log('seatSvgId: ', seatSvgId)
                // this.selectedSeat = seatSvgId
                // const element = SVG.get(seatSvgId)
                const element = SVG.get(`${seatSvgId}_group`)
                // console.log('element: ', element)
                // return
                let is_seat = false
                if (element) {
                    is_seat = element.hasClass('seat')
                }
                // Place seat in "pre_reserved" status in DB
                if (is_seat) {
                    // await this.$store.dispatch('tableSeats/reserveASeat', { planTableId, seatSvgId })
                    await this.$store.dispatch('planSeats/updatePlanSeats', { planTableId, tableSvgId, seatSvgId })
                    this.seatReserved = true

                    this.$noty.success(`La place a été ajoutée à votre panier!`)

                    // Launch countdown
                    this.$store.commit('countdown/SET_COUNTDOWN', false)
                    setTimeout(() => {
                        this.$store.commit('countdown/SET_COUNTDOWN', true)
                    }, 1000)
                }
            } catch (error) {
                console.log('error from Modal component: ', error)
                if (error.response && error.response.status === 409) {
                    this.$noty.error('Nous sommes désolés, mais ce siège est déjà réservé.')
                } else if (error.response && error.response.status === 401) {
                    this.$noty.warning('Veuillez vous connecter avant de réserver une place.')
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
        loadedPlan() {
            console.log('[WATCHER] loadedPlan watcher called from modal!')
            if (SVG.supported) {
                this.loadedPlan['plan_seats'].forEach(seat => {
                    // console.log('seat: ', seat)
                    const seatSvgId = seat.svg_id.substring(seat.svg_id.lastIndexOf('_') + 1)
                    // console.log('seatSvgId: ', seatSvgId)
                    const element = SVG.get(`${seatSvgId}_group`)
                    // console.log('element2: ', element)

                    if (element && seat.is_reserved) {
                        element.fill('#FF0000')
                        element.removeClass('seat')
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.primary-color {
    color: $primary;
}
::v-deep .seat:hover {
    cursor: pointer;
    fill: $primary;
}
</style>
