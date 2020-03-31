<template>
	<!-- <b-row class="mt-3 p-2" style="">  -->
    <b-container>
        <!-- shows: {{ shows }}<br /><br /> -->
        <!-- activeShows: {{ activeShows }}<br /><br /> -->
        <!-- performances: {{ performances }}<br /><br /> -->
        <!-- performancesByShow: {{ performancesByShow }}<br /><br /> -->
        <!-- selectedShow: {{ selectedShow }}<br /><br /> -->

        <!-- <div class="row justify-content-center my-2"> -->
        <b-row class="justify-content-center my-2">
            <!-- <div class="col-12 my-3"> -->
            <b-col cols="12" class="my-1">
                <h3 class="text-center">Réservez vos places en ligne dès maintenant!</h3>
				<h4 class="text-center">Choisissez un spectacle:</h4>
			<!-- </div> -->
            </b-col>
            <b-col cols="12">
                <b-row class="justify-content-center align-items-center">
                    <b-spinner variant="primary" label="Spinning" v-if="loading"></b-spinner>
        			<b-col cols="12" md="4" class="text-center" style="" v-for="show in activeShows" :key="show.id" v-else>
        				<span class="box" :class="[selectedShow.id === show.id ? 'active' : '']" style="" @click="selectShow(show)">
        					{{ show.name }}
        				</span>
        			</b-col>
            </b-row>
            </b-col>
        <!-- </div> -->
        </b-row>
        
        <!-- <br /><br /><br /> -->

        <!-- <div class="row justify-content-center align-items-center my-2" v-if="selectedShow.id"> -->
        <b-row class="justify-content-center align-items-center my-2" v-if="selectedShow.id">
			<!-- <div class="col-12 my-3"> -->
            <b-col cols="12" class="my-3">
				<h4 class="text-center my-4">Choisissez une représentation:</h4>
				<p>Nos 3 prochaines dates:
					<!-- <span v-if="loading">chargment...</span> -->
					<!-- nextPerformances: {{ nextPerformances }} -->
					<!-- <font-awesome-icon icon="spinner" size="lg" spin v-if="loading" /> -->
                    <b-spinner variant="primary" label="Spinning" v-if="loading"></b-spinner>
					<span class="badge badge-pill" :class="[selectedDate === performance ? 'active' : '']" v-for="performance in nextPerformances" :key="performance.id" @click="selectedDate = performance" v-else>
						{{ performance | moment('dddd, Do MMMM YYYY') }}
					</span>
				</p>
			<!-- </div> -->
            </b-col>
            <!-- <div class="col-6 text-center"> -->
            <b-col cols="12" md="6" class="text-center">
                <VueCtkDateTimePicker
                    label="Choisir une date"
                    inline
                    only-date
                    format="YYYY-MM-DD"
                    formatted="YYYY-MM-DD"
                    color="#9ACD32"
                    button-color="#9ACD32"
                    button-now-translation="Aujourd'hui"
                    :enabled-dates="performancesDates"
                    @input="selectDate"
                    v-model="selectedDate"
                />
            <!-- </div> -->
            </b-col>
            <!-- <div class="col-6 text-center"> -->
            <b-col cols="12" md="6" class="text-center">
                <div v-if="selectedDate">
                    <h4>Représentations du jour:</h4>
                    <div v-for="performance in performancesByShowByDay" :key="performance.id">
                        <span class="box" style="" @click="selectPerformance(performance)">
                            <small>{{ performance.date | moment('dddd, Do MMMM YYYY ') }}</small>
                            <b>{{ performance.date | moment('HH:mm') }}</b>
                        </span>
                    </div>
                </div>
            <!-- </div> -->
            </b-col>
        <!-- </div> -->
        </b-row>



        <!-- <div class="row justify-content-center my-5" v-if="selectedPerformance != 'abc'">
            <div class="col-6" style="border: 1px solid orange;" @click="clickOnTablePlan($event)">
                <svg-vue icon="tables_plan" style=""></svg-vue>
            </div>
        </div>
        
        <modal :selectedTable="selectedTable" @updateTableColor="updateTableColor" @closeModal="showModal = false" v-if="showModal" /> -->

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
            <div v-for="performance in performances" :key="performance.id" style="border: 1px solid orange;">
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
	<!-- </div> -->
    <!-- </b-row> -->
    </b-container>
</template>

<script>
    import moment from 'moment'
	import axios from 'axios'
	// import SVG from 'svg.js'

    // vForm for easy validation
    import Form from 'vform'

    // Vue date time picker
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

	export default {
		components: { VueCtkDateTimePicker },
		metaInfo () {
    		return { title: 'Réservation' }
  		},
        layout: 'frontend',
		async created () {
            if (this.$store.getters['shows/shows'].length < 1) {
                this.$store.commit('loading/SET_LOADING', true)
                await this.$store.dispatch('shows/fetchShows')
                this.$store.commit('loading/SET_LOADING', false)
			}
		},
        async mounted () {
            // if (this.performance && this.performance.id) {
            //     this.selectedShow = this.performance.show
            //     this.selectedDate = moment(this.performance.date).format('YYYY-MM-DD')
            // }
            this.selectedShow = this.$store.getters['shows/show']
    	},
    	data () {
    		return {
    			showModal: false,
                selectedShow: {},
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
				return this.$store.getters['loading/loading']
			},
            shows () {
                return this.$store.getters['shows/shows']
            },
            activeShows () {
                return this.$store.getters['shows/shows'].filter(show => show.is_active == true)
            },
            performances () {
                return this.$store.getters['performances/performances']
            },
            performance () {
                return this.$store.getters['performances/performance']
            },
            performancesByShow () {
				// if (this.selectedShow) {
					// return this.$store.getters['performances/performances'].filter(performance => performance.show_id === this.selectedShow.id)
				// }
                // return Object.values(this.performances).filter(performance => performance.show_id === this.selectedShow.id)
				// return []

                // Convert object to array
                const array = []
                for (let key in this.performances) {
                    if (this.performances.hasOwnProperty(key) && this.performances[key] != null) {
                        array.push(this.performances[key])
                    }
                }
                return array.filter(performance => performance.show_id === this.selectedShow.id)
            },
            performancesByShowByDay () {
                return this.performancesByShow.filter(performance => moment(performance.date).format('YYYY-MM-DD') === this.selectedDate)
            },
            performancesDates () {
                return this.performancesByShow.map(performance => moment(performance.date).format('YYYY-MM-DD'))
            },
    		planTables () {
    			return this.$store.getters['planTables/planTables']
			},
			nextPerformances () {
				return this.performancesByShow
					.filter(performance => moment(performance.date) >= moment())
					.map(performance => moment(performance.date).format('YYYY-MM-DD'))
                    .sort()
					.reduce((unique, item) => {
						return unique.includes(item) ? unique : [...unique, item]
					}, [])
					.splice(0, 3)
			}
    	},
    	methods: {
            // listenToBroadcastedEvents () {
            //     this.$echo.channel('update-table-seat').listen('NewMessage', (payload) => {
            //         console.log('update table seat channel: ', payload)
            //     })
            // },
            async selectShow (show) {
				this.$store.commit('loading/SET_LOADING', true)
				this.selectedShow = show
                await this.$store.commit('shows/SET_SHOW', show)
				await this.$store.dispatch('performances/fetchPerformancesByShow', { showId: this.selectedShow.id })
				this.$store.commit('loading/SET_LOADING', false)
            },
            selectDate (date) {
                this.selectedDate = date
            },
            selectPerformance (performance) {
				this.selectedPerformance = performance
                // this.$store.commit('performances/setPerformance', performance)
                // this.$store.commit('performances/SET_PERFORMANCE', performance)
				this.$router.push(`/reservations/${performance.id}`)
            },
    		// async clickOnTablePlan(event) {
      //   		try {
      //               console.log('clickOnTablePlan: ', event)
      //       		const tableSvgId = event.target.id
      //       		console.log('tableSvgId: ', tableSvgId)
      //       		if (tableSvgId) {
      //       			// const { data } = await axios.get(`api/plan-tables/${tableSvgId}`)
      //                   const data = await this.$store.dispatch('planTables/fetchSeatsByTable', { tableSvgId })
      //       			console.log('data: ', data)
      //       			// console.log('data.seats: ', data.seats)
      //       			this.selectedTable = data
      //       			this.showModal = true
      //       		} else {
      //       			this.selectedTable = null
      //       		}
      //           } catch (error) {
      //               this.$noty.error('Une erreur est survenue. Veuillez nous excuser.')
      //           }
      //   	},
            updateTableColor(data) {
                console.log('updateTableColor: ', data)
                const { table_svg_id, color } = data
                const element = SVG.get(table_svg_id)
                element.fill(color)
            }
        }
	}
</script>

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
        &:hover {
            background-color: $primary;
            color: #fff;    
            cursor: pointer;
        }
        &.active {
            background-color: $primary;
            color: #fff;
        }
    }
	.badge-pill {
        background-color: #fff;
		color: $primary;
        border: 1px solid $primary;
		margin: 0 .5rem;
		padding: .5rem;
        &:hover {
            background-color: $primary;
            color: #fff;
            cursor: pointer;
        }
        &.active {
            background-color: $primary;
            color: #fff;
        }
	}
</style>