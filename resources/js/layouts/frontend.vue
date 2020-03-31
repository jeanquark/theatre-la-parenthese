<template>
    <div id="app" class="background-image">
        <countdown :countdown="reservationConfirmationCountdown" v-if="shoppingCart.length > 0" />
        <!-- countdown: {{ countdown }}<br /><br /> -->
        <!-- shoppingCart: {{ shoppingCart }}<br /><br /> -->
        <navbar class="d-none d-lg-block mb-5" />
        <Slide class="d-lg-none d-block" style="padding-bottom: 100px;">
            <div v-if="authUser">{{ authUser.firstname }}&nbsp; {{ authUser.lastname }}</div>
            <router-link to="/accueil" id="home">
                <span>Accueil</span>
            </router-link>
            <router-link to="/qui-sommes-nous" id="who">
                <span>Qui sommes-nous?</span>
            </router-link>
            <!-- <router-link to="/spectacles" id="shows">
                <span>Spectacles</span>
            </router-link> -->
            <router-link to="/reservations" id="reservations">
                <span>Réservations</span>
            </router-link>
            <router-link to="/admin/dashboard" id="admin" v-if="authUser && authUser.roles && authUser.roles.includes('admin')">
                <span>Admin</span>
            </router-link>
            <router-link to="/login" id="login" v-if="!authUser">
                <span>Login</span>
            </router-link>
            <router-link to="/enregistrement" id="register" v-if="!authUser">
                <span>S'enregistrer</span>
            </router-link>
            <router-link to="" v-if="authUser">
                <span @click="logout">Logout</span>
            </router-link>
        </Slide>
        <div class="content">
            <child />
        </div>

        <!-- <Footer class="footer" /> -->
        <footer class="footer">theatre-la-parenthese.ch @{{ new Date().getFullYear() }}</footer>
    </div>
</template>

<script>
import Noty from 'noty'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import { Slide } from 'vue-burger-menu'
import Countdown from '~/components/Countdown'

export default {
    name: 'FrontendLayout',
    components: { Navbar, Slide, Footer, Countdown },
    created() {
        console.log('[created] Using frontend layout!')
    },
    async mounted() {
        console.log('[mounted] Using frontend layout!')

        if (this.shoppingCart.length > 0) {
            this.$store.commit('countdown/SET_COUNTDOWN', true)
        }
        // new Noty({
        //     type: 'warning',
        //     text: this.countdown
        // }).show()
    },
    data() {
        return {
            reservationConfirmationCountdown: parseInt(process.env.MIX_RESERVATION_COUNTDOWN) || 720,
            // reservationConfirmationCountdown: 30
            interval: null
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/user']
        },
        shoppingCart() {
            return this.$store.getters['shoppingCart/shoppingCart']
        },
        countdown() {
            return this.$store.getters['countdown/countdown']
        }
    },
    methods: {
        logout() {
            console.log('logout')
            this.$store.dispatch('auth/logout')
        }
    },
    watch: {
        countdown() {
            console.log('[WATCH] countdown')
            if (this.countdown) {
                this.reservationConfirmationCountdown = parseInt(process.env.MIX_RESERVATION_COUNTDOWN) || 720
                this.interval = setInterval(() => {
                    console.log('this.reservationConfirmationCountdown: ', this.reservationConfirmationCountdown)
                    this.reservationConfirmationCountdown--
                    if (this.reservationConfirmationCountdown <= 0) {
                        clearInterval(this.interval)
                        this.shoppingCart.forEach(planSeat => {
                            this.$store.dispatch('planSeats/deletePlanSeatPreReservation', { planSeatId: planSeat.id })
                            // this.$store.dispatch('planSeats/updatePlanSeats', { planTableId, tableSvgId, seatSvgId })
                        })
                        this.$store.commit('countdown/SET_COUNTDOWN', false)
                    }
                }, 1000)
                // interval = setInterval(myCallback(), 1000)
                // function myCallback () {
                //     console.log('this.reservationConfirmationCountdown: ', this.reservationConfirmationCountdown)
                //     this.reservationConfirmationCountdown--
                //     if (this.reservationConfirmationCountdown <= 0) {
                //         clearInterval(interval)
                //         this.shoppingCart.forEach(planSeat => {
                //             this.$store.dispatch('planSeats/deletePlanSeatPreReservation', { planSeatId: planSeat.id })
                //         })
                //         this.$store.commit('countdown/SET_COUNTDOWN', false)
                //     }
                // }
            } else {
                console.log('clearInterval')
                clearInterval(this.interval)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.content {
    flex: 1 0 auto;
    /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
    padding: 20px;
}

.footer {
    flex-shrink: 0;
    /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
    padding: 20px;
    height: 100px;
}
footer {
    background: $primary;
    color: white;
    text-align: center;
}

@media screen and (min-width: 960px) {
    .background-image {
        background: url('/images/svg/bracket_left.svg') left 10px top calc(50% - 50px), url('/images/svg/bracket_right.svg') right 10px top calc(50% - 50px);
        background-repeat: no-repeat;
        /*background-size: cover;*/
        /*background-position: right 10px top 10px;*/
    }
}
</style>
