<template>
    <!-- <b-container>
        countdown: {{ countdown }}<br />
        <b-row class="notification justify-content-center" v-if="countdown">
            <b-col cols="12">
                Votre session se termine dans<br />
                {{ countdown | moment('mm:ss') }} {{ countdown < 10 ? 'secondes' : 'minutes' }}
            </b-col>
            <b-col cols="12">
                <b-button size="sm" @click="resetCountdown" :disabled="loading" class="text-center">Prolonger</b-button>
            </b-col>

        </b-row>
    </b-container> -->
    <b-container>
        <b-row class="justify-content-center">
            <b-col cols="12" md="8">
                <b-alert :show="countdown" variant="warning" class="notification">
                    <p>Votre session va se terminer dans {{ countdown }} {{ countdown < 60 ? 'secondes' : 'minutes' }}...</p>
                    <p>
                        Veuillez confirmer vos reservations avant la fin de votre session.
                        <router-link to="/mon-panier">Mon panier &rarr;</router-link>
                    </p>
                    <b-progress variant="warning" :max="dismissSecs" :value="countdown" height="4px"></b-progress><br />
                    <div class="text-center">
                        <b-button size="sm" @click="resetCountdown" :disabled="loading" class="">Prolonger</b-button>
                    </div>
                </b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['countdown'],
    data() {
        return {
            loading: false,
            dismissSecs: parseInt(process.env.MIX_RESERVATION_COUNTDOWN || 720)
            // dismissCountDown: 0,
            // showDismissibleAlert: false
        }
    },
    computed: {},
    methods: {
        async resetCountdown() {
            this.loading = true
            console.log('resetCountdown')
            this.$store.commit('countdown/SET_COUNTDOWN', false)
            setTimeout(() => {
                this.$store.commit('countdown/SET_COUNTDOWN', true)
                this.loading = false
            }, 1000)
        }
        // countDownChanged(dismissCountDown) {
        //     this.dismissCountDown = dismissCountDown
        // },
        // showAlert() {
        //     this.dismissCountDown = this.dismissSecs
        // }
    }
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';

.notification {
    // position: fixed;
    // top: 20px;
    // right: 20px;
    // text-align: right;
    // width: 300px;
    z-index: 50;
    opacity: 0.8;
}
</style>
