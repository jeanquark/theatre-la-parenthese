<template>
    <b-container>
        <h1 class="text-center mb-4">Mon panier</h1>
        <!-- authUser: {{ authUser }}<br /><br /> -->
        <!-- shoppingCart: {{ shoppingCart }}<br /><br /> -->
        <!-- preReservations: {{ preReservations }}<br /><br /> -->
        <!-- userSeats: {{ userSeats }}<br /><br /> -->

        <b-alert show variant="info" v-if="preReservations.length > 0 && authUser">
            Vous avez {{ preReservations.length }} billets en pré-réservation. Veuillez confirmer votre réservation en appuyant sur le bouton correspondant.
        </b-alert>
        <b-alert show variant="info" v-if="preReservations.length > 0 && !authUser"
            >{{ preReservations.length }} billets en pré-réservation. Veuillez d'abord vous connecter/enregistrer, puis confirmer votre réservation.
            <router-link to="/login">Login &rarr;</router-link></b-alert
        >

        <b-table :items="shoppingCart" :fields="fields" striped responsive="sm" v-if="shoppingCart.length > 0">
            <template v-slot:cell(seat_number)="data">
                <b class="text-info">{{ data.item.seat_number }}</b>
            </template>

            <template v-slot:cell(table.plan.performance.date)="data">
                <span v-if="data.item.table.plan">
                    {{ data.item.table.plan.performance.date | moment('dddd Do MMM YYYY HH:mm') }}
                </span>
            </template>

            <template v-slot:cell(status)="data">
                <!-- {{ data.item.status }} -->
                {{ formattedStatus(data.item.status) }}
            </template>

            <template v-slot:cell(price)="data"> {{ parseInt(data.item.price) / 100 }} CHF </template>

            <template v-slot:cell(actions)="data">
                <b-button size="sm" variant="danger" @click="deletePlanSeatPreReservation(data.item)" v-if="data.item.status === 'pre_reservation'">Annuler ma pré-réservation</b-button>
                <b-button size="sm" variant="danger" @click="deletePlanSeatConfirmedReservation(data.item)" v-if="data.item.status === 'confirmation_pending'">Supprimer ma réservation</b-button>
            </template>

            <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2"> {{ row.detailsShowing ? 'Cacher' : 'Montrer' }} détails </b-button>
            </template>

            <template slot="bottom-row" slot-scope="">
                <td colspan="3"><b>Total restant à payer</b></td>
                <td>
                    <b>{{ totalPrice }} CHF</b>
                </td>
                <td colspan="2"></td>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <!-- <b-row class="mb-2">
						<b-col sm="3" class="text-sm-right"><b>Nom et Prénom:</b></b-col>
						<b-col>{{ row.item.user.lastname }} {{ row.item.user.firstname }}</b-col>
					</b-row> -->

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Spectacle:</b></b-col>
                        <b-col>{{ row.item.table.plan.performance.name }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Lieu:</b></b-col>
                        <b-col>{{ row.item.table.plan.performance.location }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Dernière modification:</b></b-col>
                        <b-col>{{ row.item.updated_at | moment('from', 'now') }}</b-col>
                    </b-row>

                    <b-row class="justify-content-center mb-2">
                        <b-button size="sm" @click="row.toggleDetails">Cacher détails</b-button>
                    </b-row>
                </b-card>
            </template>
        </b-table>

        <b-alert show variant="info" v-else>Aucune réservation effectuée pour le moment.</b-alert>

        <div>
            <!-- <b-row class="justify-content-center my-4" v-if="authUser && preReservations.length > 0"> -->
            <b-row class="justify-content-center my-4">
                <b-button variant="primary" :disabled="!authUser || preReservations.length < 1 || loading" @click="confirmPlanSeatReservation">Confirmer {{ preReservations.length > 1 ? 'mes pré-réservations' : 'ma pré-réservation' }} <font-awesome-icon icon="check-circle" size="1x"/></b-button>
                
            </b-row>

            <br /><br />

            <b-row class="justify-content-center my-2" v-if="authUser">
                <b-card title="Nos coordonnées bancaires:" tag="article" style="max-width: 20rem;" class="mb-2">
                    <b-card-text>
                        <p>
                            Théatre la parenthèse<br />
                            Compte postal: {{ postal_account }} <br />
                            IBAN: {{ iban }}
                        </p>
                    </b-card-text>
                </b-card>
            </b-row>
        </div>
    </b-container>
</template>

<script>
export default {
    // middleware: ['auth'],
    layout: 'frontend',
    async created() {},
    async mounted() {
        if (this.authUser) {
            if (this.$store.getters['planSeats/userSeats'].length < 1) {
                await this.$store.dispatch('planSeats/fetchUserSeats', { userId: this.authUser.id })
            }
        }
    },
    data() {
        return {
            iban: process.env.MIX_IBAN,
            postal_account: process.env.MIX_POSTAL_ACCOUNT,
            fields: [
                {
                    key: 'seat_number',
                    label: 'N° de place',
                    sortable: true
                },
                {
                    key: 'table.plan.performance.date',
                    label: 'Date',
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Statut',
                    sortable: true
                },
                {
                    key: 'price',
                    label: 'Prix',
                    sortable: true
                },
                {
                    key: 'show_details',
                    label: 'Détails',
                    sortable: false
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    sortable: false
                }
            ],
            loading: false
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/user']
        },
        userSeats() {
            return this.$store.getters['planSeats/userSeats']
        },
        shoppingCart() {
			// return this.$store.getters['shoppingCart/shoppingCart']
            return [...this.$store.getters['shoppingCart/shoppingCart'], ...this.userSeats]
        },
        // allUserSeats () {
        //     return [...this.userSeats, ...this.shoppingCart]
        // },
        totalPrice() {
            return this.shoppingCart.reduce((a, b) => a + (b['price'] || 0), 0) / 100
        },
        preReservations() {
            return this.shoppingCart.filter(ticket => ticket.status === 'pre_reservation')
        }
    },
    methods: {
        formattedStatus(status) {
            switch (status) {
                case 'pre_reservation':
                    return 'Pré-reservation'
                    break
                case 'confirmation_pending':
                    return 'En attente de réception du paiement'
                    break
                case 'reservation_confirmed':
                    return 'Réservation confirmée'
                    break
                case 'reservation_rejected':
                    return 'Réservation rejetée'
                    break
                default:
                    return 'Status non spécifié'
                    break
            }
        },
        async deletePlanSeatPreReservation(planSeat) {
            try {
                const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer la pré-réservation de la place N° ${planSeat.seat_number}?`, {
                    okTitle: 'OK',
                    cancelTitle: 'Annuler'
                })
                console.log('value: ', value)
                if (value) {
                    console.log('deletePlanSeatReservation: ', planSeat.id)
                    await this.$store.dispatch('planSeats/deletePlanSeatPreReservation', { planSeatId: planSeat.id })
                    this.$noty.success('La réservation a été annulée avec succès.')
                }
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.")
            }
        },
        async deletePlanSeatConfirmedReservation(planSeat) {
            try {
                const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer la réservation de la place N° ${planSeat.seat_number}?`, {
                    okTitle: 'OK',
                    cancelTitle: 'Annuler'
                })
                console.log('value: ', value)
                if (value) {
                    console.log('deleteReservation: ', planSeat.id)
                    await this.$store.dispatch('planSeats/deletePlanSeatConfirmedReservation', { planSeatId: planSeat.id })
                    this.$noty.success('La réservation a été annulée avec succès.')
                }
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.")
            }
        },
        async confirmPlanSeatReservation() {
            try {
                this.loading = true
                await this.$store.dispatch('planSeats/confirmPlanSeatReservation', { shoppingCart: this.shoppingCart })
                this.loading = false
                this.$noty.success('Votre pré-réservation a été confirmée. Vous allez recevoir un e-mail de confirmation.')

            } catch (error) {
                console.log('error: ', error)
                this.loading = false
                this.$noty.error("Nous sommes désolés. Une erreur est survenue et l'opération n'a pas pu être complétée.")
            }
        }
    }
}
</script>

<style scoped>
/* >>>.table th {
		vertical-align: middle;
	}
	>>>.table td {
		vertical-align: middle;
	} */
/* .nowrap {
        white-space:nowrap;
    } */
.disabled:hover {
    cursor: not-allowed;
}
</style>
