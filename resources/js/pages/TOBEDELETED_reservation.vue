<template>
	<div class="">
        
        <!-- loadedPerformances: {{ loadedPerformances }}<br /><br /> -->
        <!-- {{ loadedPerformances.map(performance => ((performance.date).moment('YYYY-MM-DD'))) }} -->
        <!-- loadedPerformancesDates: {{ loadedPerformancesDates }}<br /><br /> -->
		loading: {{ loading }}<br /><br />
        selectedShow: {{ selectedShow }}<br /><br />
        selectedPerformance: {{ selectedPerformance }}<br /><br />
        selectedTable: {{ selectedTable }}<br /><br />
        <h2 class="text-center">Réservez vos places en ligne dès maintenant!</h2>

        <div class="row justify-content-center my-5">
			<div class="col-12 my-5">
				<h4 class="text-center">Choisissez un spectacle:</h4>
			</div>
			<div class="" style="" v-for="show in loadedShows" :key="show.id">
				<span class="box" style="" @click="selectShow(show)">
					{{ show.name }}
				</span>
			</div>
        </div>
        
        <!-- <br /><br /><br /> -->

        <div class="row justify-content-center align-items-center my-5" v-if="selectedShow != 'abc'">
			<div class="col-12 my-5">
				<h4 class="text-center">Choisissez une représentation:</h4>
				<p>Les prochaines dates:
					<!-- <span v-if="loading">chargment...</span> -->
					<font-awesome-icon icon="spinner" size="lg" spin v-if="loading" />
					<span class="badge badge-pill badge-primary" v-for="performance in nextPerformances" :key="performance.id" v-else>
						{{ performance.date | moment('dddd, Do MMMM YYYY') }}
					</span>
				</p>
			</div>
            <div class="col-6 text-center">
                <VueCtkDateTimePicker
                    label="Choisir une date"
                    inline
                    only-date
                    format="YYYY-MM-DD"
                    formatted="YYYY-MM-DD"
                    color="#9ACD32"
                    button-color="#9ACD32"
                    button-now-translation="Aujourd'hui"
                    :enabled-dates="loadedPerformancesDates"
                    @input="selectDate"
                    v-model="form.performance"
                />
            </div>
            <div class="col-6 text-center">
                <div v-if="selectedDate != 'abc'">
                    <h4>Représentations du jour:</h4>
                    <div v-for="performance in loadedPerformancesByShowByDay" :key="performance.id">
                        <router-link :to="`/performances/${performance.id}`" class="box" style="" @click="selectPerformance(performance)">
                            <small>{{ performance.date | moment('dddd, Do MMMM YYYY ') }}</small>
                            <b>{{ performance.date | moment('HH:mm') }}</b>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center my-5" v-if="selectedPerformance != 'abc'">
            <div class="col-6" style="border: 1px solid orange;" @click="clickOnTablePlan($event)">
                <svg-vue icon="tables_plan" style=""></svg-vue>
            </div>
        </div>
        
        <modal :selectedTable="selectedTable" @updateTableColor="updateTableColor" @closeModal="showModal = false" v-if="showModal" />

		<!-- selectedTable: {{ selectedTable }}<br /><br />
		planTables: {{ planTables }}<br /><br />
		<router-link to="/mes-reservations">Mes reservations</router-link>
        <div class="row justify-content-center">
            <h2 class="text-center">Spectacles:</h2>
            <div v-for="show in loadedShows" :key="show.id" style="border: 1px solid yellow;" @click="selectShow(show)">
                {{ show.name }}
            </div>
        </div>
        <div class="row justify-content-center">
            <h2 class="text-center">Représentations:</h2>
            <div v-for="performance in loadedPerformances" :key="performance.id" style="border: 1px solid orange;">
                {{ performance.name }}
            </div>
        </div>
		<div class="row justify-content-center">
            <div class="col-6">
    	   		<div style="border: 1px dashed green;" @click="clickOnTablePlan($event)">
					<svg-vue icon="tables_plan" style="border: 1px solid orange;"></svg-vue>
				</div>
			</div>
		</div>
		<modal :selectedTable="selectedTable" @updateTableColor="updateTableColor" @closeModal="showModal = false" v-if="showModal" /> -->
	</div>
</template>

<script>
    import moment from 'moment'
	import axios from 'axios'
	import SVG from 'svg.js'
	import Modal from '../components/Modal'
    import UserReservations from '../components/UserReservation'

    // vForm for easy validation
    import Form from 'vform'

    // Vue date time picker
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


	export default {
		components: { Modal, UserReservations, VueCtkDateTimePicker },
		metaInfo () {
    		return { title: 'Réservation' }
  		},
        layout: 'frontend',
		async created () {
			// await this.$store.dispatch('planSeats/fetchPlanSeats')
			// this.$store.getters['planTables/planTables'].forEach(table => {
			// 	console.log('table: ', table)
			// 	// await this.$store.dispatch()
			// 	// console.log('table.seats: ', table.seats)
			// })
            // console.log(moment().format('YYYY-MM-DD'))
            if (this.$store.getters['shows/shows'].length < 1) {
                this.$store.dispatch('shows/fetchShows')
            }
		},
        async mounted () {
            const performanceId = 1
    		await this.$store.dispatch('planTables/fetchPlanTables', { performanceId })
            console.log('this.planTables: ', this.planTables)
    		console.log('this.planTables[0]: ', this.planTables[0])
    		// this.planTables.forEach(table => {
        	// if (this.planTables)
    		for (let table of this.planTables) {
    			console.log('table: ', table)
    			// console.log('table.seats: ', table.seats)
    			// this.$store.dispatch('planSeats/fetchSeatsByTableId', { tableId: table.id })
    			// await this.$store.dispatch('planTables/fetchSeatsByTable', { svgId: table.svg_id })
				// const element = SVG.get(table.svg_id)
				// console.log('element: ', element)
    			// const total_seats = table.total_seats
    			// console.log('total_seats: ', total_seats)
    			// const reserved_seats = this.$store.getters['planTables/tableSeats'][table.svg_id].filter(seat => seat.is_reserved === true)
    			// console.log('reserved_seats: ', reserved_seats)
    			
    			// if (reserved_seats.length >= total_seats) {
    			// 	element.fill('#FF0000')
    			// 	element.removeClass('seat')
    			// } else if (total_seats - reserved_seats.length <= 2) {
                //     element.fill('#FFA500')
    			// } else {
    			// 	element.fill('#00FF00')
    			// }
    		}
    		if (SVG.supported) {
            // this.selectedTable.seats.forEach(seat => {
            //     console.log('seat: ', seat)
            //     const element = SVG.get(seat.svg_seat_id)
            //     console.log('element: ', element)
            //     if (element && seat.is_reserved) {
            //         element.fill('#FF0000')
            //         element.removeClass('seat')
            //     }
            // })
            }
    	},
    	data () {
    		return {
    			showModal: false,
                selectedShow: null,
                selectedPerformance: null,
                selectedDate: null,
    			selectedTable: null,
                form: new Form({
                    performance: ''
                })
    		}
    	},
    	computed: {
			loading () {
				return this.$store.getters['index/loading']
			},
            loadedShows () {
                return this.$store.getters['shows/shows']
                // return this.$store.getters['shows/shows'].filter(show => show.is_active === true)
            },
            loadedPerformancesByShow () {
                return this.$store.getters['performances/performances'].filter(performance => performance.show_id === this.selectedShow.id)
            },
            loadedPerformancesByShowByDay () {
                return this.loadedPerformancesByShow.filter(performance => moment(performance.date).format('YYYY-MM-DD') === this.selectedDate)
            },
            loadedPerformancesDates () {
                return this.loadedPerformancesByShow.map(performance => moment(performance.date).format('YYYY-MM-DD'))
            },
    		planTables () {
    			return this.$store.getters['planTables/planTables']
			},
			nextPerformances () {
				// const abc = this.loadedPerformancesByShow
				// console.log('abc: ', abc)

				return this.loadedPerformancesByShow.filter(performance => moment(performance.date) >= moment()).splice(0, 2)
			}
    	},
    	methods: {
            listenToBroadcastedEvents () {
                this.$echo.channel('update-table-seat').listen('NewMessage', (payload) => {
                    console.log('update table seat channel: ', payload)
                })
            },
            async selectShow (show) {
				this.$store.commit('index/setLoading', true)
				this.selectedShow = show
				await this.$store.dispatch('performances/fetchPerformancesByShow', { showId: this.selectedShow.id })
				this.$store.commit('index/setLoading', false)
            },
            selectDate (date) {
                this.selectedDate = date
            },
            selectPerformance (performance) {
                this.selectedPerformance = performance
            },
    		async clickOnTablePlan(event) {
        		try {
                    console.log('clickOnTablePlan: ', event)
            		const tableSvgId = event.target.id
            		console.log('tableSvgId: ', tableSvgId)
            		if (tableSvgId) {
            			// const { data } = await axios.get(`api/plan-tables/${tableSvgId}`)
                        const data = await this.$store.dispatch('planTables/fetchSeatsByTable', { tableSvgId })
            			console.log('data: ', data)
            			// console.log('data.seats: ', data.seats)
            			this.selectedTable = data
            			this.showModal = true
            		} else {
            			this.selectedTable = null
            		}
                } catch (error) {
                    this.$noty.error('Une erreur est survenue. Veuillez nous excuser.')
                }
        	},
            updateTableColor(data) {
                console.log('updateTableColor: ', data)
                const { table_svg_id, color } = data
                const element = SVG.get(table_svg_id)
                element.fill(color)
            }
        }
	}
</script>

<style scoped>
    >>>.table {
      fill: yellow;
    }
    >>>.table:hover {
      cursor: pointer;
      fill: green;
    }
</style>

<style lang="scss" scoped>
    @import './resources/sass/_variables.scss';
    .box {
        display: inline-block;
        border: 2px solid $primary;
        margin: 1rem;
        padding: .6rem 1rem;
        border-radius: 2rem;
        background-color: #fff;
        color: $primary;
    }
    .box:hover {
        background-color: $primary;
        color: #fff;
        cursor: pointer;
    }
	.badge {
		color: #fff;
		margin: 0 .5rem;
		padding: .5rem;
	}
</style>