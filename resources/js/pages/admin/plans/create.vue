<template>
    <!-- <div> -->
    <b-container>
        <!-- <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/admin/plans"><font-awesome-icon icon="chair" />&nbsp;Plans de salle</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Créer</li>
            </ol>
        </nav> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans"><font-awesome-icon icon="chair" />&nbsp;Plans de salle</b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>

        <!-- newTablesArray: {{ newTablesArray }}<br /><br /> -->
        <!-- loadedShows: {{ loadedShows }}<br /><br /> -->
        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
        <!-- selectedShow: {{ selectedShow }}<br /><br /> -->
        <!-- newPerformance: {{ newPerformance }}<br /><br /> -->
        <!-- newPlan: {{ newPlan }}<br /><br /> -->

        <!-- <b-container> -->
            <h2 class="text-center">Créer un nouveau plan</h2>

            <b-row class="justify-content-center my-3 px-3">
                <b-col cols="12" md="6">
                    <b-form-group label="Entrer un nom pour le nouveau plan:" label-for="newPlanName">
                        <b-form-input type="text" required placeholder="Plan n° 1" id="newPlanName" v-model="newPlan.name"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Sélectionner le spectacle:" label-for="newPlanShow">
                        <b-form-select id="newPlanShow" v-model="selectedShow" @change="updateShowId">
                            <option v-for="show in loadedShows" :value="show" :key="show.id">{{ show.name }}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="justify-content-start my-3 px-3" v-if="selectedShow">
                <b-col cols="12" md="6">
                    <b-form-group label="Entrer un nom pour cette représentation:" label-for="newPerformanceName">
                        <b-form-input id="newPerformanceName" placeholder="Représentation n°1" v-model="newPerformance.name"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Entrer un lieu pour cette représentation:" label-for="newPerformanceLocation">
                        <b-form-input id="newPerformanceLocation" placeholder="Beaulieu, Morges" v-model="newPerformance.location"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group label="Entrer une date pour cette représentation:" label-for="newPerformanceDate">
                        <VueCtkDateTimePicker label="Cliquer pour choisir une date" format="YYYY-MM-DD HH:mm" formatted="YYYY-MM-DD HH:mm" color="#9ACD32" button-color="#9ACD32" button-now-translation="Aujourd'hui" id="newPerformanceDate" v-model="newPerformance.date" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="justify-content-center my-3">
                <b-col cols="6" sm="4" md="2" v-for="table in loadedTables" :key="table.id">
                    <b-card :img-src="`/images/svg/models/model_${table.svg_id}.svg`" img-alt="Image" img-top @click="addTable(table)" class="available-table">
                        <b-card-text class="text-center">{{ table.name }}</b-card-text>
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="justify-content-center my-3">
                <b-col cols="10" @click="clickOnTablesPlan($event)">
                    <svg-vue id="tables_plan" :icon="`models/model_plan`"></svg-vue>
                </b-col>
            </b-row>

            <b-row class="justify-content-center my-2">
                <b-button size="sm" variant="danger" :disabled="!selectedTable" @click="deleteTable">Supprimer la table sélectionnée</b-button>
            </b-row>
            <b-row class="justify-content-center my-2">
                <b-button variant="primary" :disabled="!newPerformance.date || loading" @click="savePlan">Créer le plan</b-button><br />
            </b-row>
        <!-- </b-container> -->
    <!-- </div> -->
	</b-container>
</template>

<script>
	import SVG from 'svg.js'
	import 'svg.draggable.js'

	// Vue date time picker
	import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
	import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

	export default {
		components: { VueCtkDateTimePicker },
		async created() {
			if (!this.$store.getters['tables/tables'].length) {
				await this.$store.dispatch('tables/fetchTables')
			}
			await this.$store.dispatch('shows/fetchShows')
			await this.$store.dispatch('performances/fetchPerformances')
		},
		mounted () {
		},
		data() {
			return {
				selectedShow: null,
				selectedTable: null,
				newTablesArray: [],
				newPerformance: {
					show_id: '',
					name: '',
					location: '',
					date: ''
				},
				newPlan: {
					svg_id: '',
					name: ''
				}
			}
		},
		computed: {
			loading() {
				return this.$store.getters['loading']
			},
			loadedTables() {
				return this.$store.getters['tables/tables']
			},
			loadedShows() {
				return this.$store.getters['shows/shows']
			}
		},
		methods: {
			updateShowId() {
				const randomId = Math.random()
					.toString(36)
					.substr(2, 9)
				this.newPlan.svg_id = randomId
				this.newPerformance.show_id = this.selectedShow.id
			},
			formattedTableNumber(number) {
				return ('0' + number).slice(-2)
			},
			async clickOnTablesPlan(event) {
				try {
					// console.log('clickOnTablesPlan: ', event)
					const tableId = event.target.id
					const tableSvgId = tableId.substring(0, tableId.indexOf('_'))
					// console.log('tableSvgId: ', tableSvgId)

					if (this.selectedTable && this.selectedTable.svg_id) {
						SVG.get(`${this.selectedTable.svg_id}_table`).attr('stroke', null)
					}

					if (tableId != 'tables_plan') {
						// Clicked on a table
						this.selectedTable = this.newTablesArray.find(table => table.svg_id === tableSvgId)
						SVG.get(`${tableSvgId}_table`)
							.attr('stroke', '#FF0000')
							.attr('stroke-width', 1)
					} else {
						// Clicked on blank space
						console.log('Click on blank space')
						this.selectedTable = null
					}
				} catch (error) {
					console.log('error: ', error)
				}
			},
			async addTable(table) {
				const newTable = { ...table }
				const shift = table.r / 2
				// Generate random ID
				const randomId = Math.random()
					.toString(36)
					.substr(2, 9)

				// Define table number
				let tableNumber = '01'

				const tablesPlan = SVG('tables_plan').svg()
				const existingTablesNumbers = tablesPlan.match(/data-table-number="\d+"/g)
				const array = []
				if (existingTablesNumbers) {
					existingTablesNumbers.forEach(data => array.push(parseInt(data.match(/\d+/g)[0])))
					console.log('array: ', array)
					tableNumber = array.reduce((prev, current) => {
						return prev > current ? this.formattedTableNumber(parseInt(prev) + 1) : this.formattedTableNumber(parseInt(current) + 1)
					}, tableNumber)
				}

				console.log('tableNumber: ', tableNumber)

				// Push to new tables array
				newTable['svg_id'] = randomId
				newTable['table_number'] = tableNumber
				this.newTablesArray.push(newTable)

				// Add table in plan
				if (table.svg_type === 'circle') {
					const newTableSVG = SVG('tables_plan')
						.group()
						.attr({ id: `${randomId}_group` })
						.draggable({
							minX: -(SVG('tables_plan').viewbox().width / 2 - shift),
							maxX: SVG('tables_plan').viewbox().width / 2 + shift,
							minY: -(SVG('tables_plan').viewbox().height / 2 - shift),
							maxY: SVG('tables_plan').viewbox().height / 2 + shift
						})
						.addClass('table')

					newTableSVG
						.circle(table.r)
						.attr({
							cx: SVG('tables_plan').viewbox().width / 2,
							cy: SVG('tables_plan').viewbox().height / 2,
							id: `${randomId}_table`,
							'data-svg-model': table.svg_model,
							'data-total-seats': table.total_seats,
							'data-table-number': tableNumber
						})

					newTableSVG
						.text('')
						.attr({ id: `${randomId}_text` })
						.tspan(tableNumber)
						.attr({ id: `${randomId}_span` })
						.font({
							family: 'Helvetica',
							size: 10,
							dx: SVG('tables_plan').viewbox().width / 2 - 6,
							dy: SVG('tables_plan').viewbox().height / 2 + 3,
							fill: '#9ACD32'
						})
				}
				if (table.svg_type == 'path') {
					SVG('tables_plan')
						.path(table.d)
						.attr({ id: randomId, 'data-svg-model': table.svg_model, 'data-total-seats': table.total_seats })
						.draggable()
						.addClass('table')
				}
			},
			async savePlan() {
				try {
					// console.log('savePlan')
					this.$store.commit('SET_LOADING', true, { root: true })
					// Remove selection ring
					if (this.selectedTable && this.selectedTable.svg_id) {
						SVG.get(`${this.selectedTable.svg_id}_table`).attr('stroke', null)
					}

					const def = await this.$store.dispatch('plans/createPlan', {
						newPlanSVG: SVG('tables_plan').svg(),
						newPlan: this.newPlan,
						newTablesArray: this.newTablesArray,
						newPerformance: this.newPerformance
					})
					console.log('def: ', def)
					this.$store.commit('SET_LOADING', false)
					this.$noty.success('Le plan de salle a été créer avec succès. Vous allez être redirigé vers la page des plans.')
					setTimeout(() => {
						// this.reloadPage()
						window.location.href = '../plans'
					}, 1000)
					// this.reloadPage()
				} catch (error) {
					this.$store.commit('SET_LOADING', false)
					console.log('error: ', error)
					this.$noty.error("Une erreur est apparue et le plan de salle n'a pas pu être créer.")
				}
			},
			async deleteTable() {
				try {
					SVG.get(`${this.selectedTable.svg_id}_group`).remove()
					this.selectedTable = null
				} catch (error) {
					this.$noty.error("Nous sommes désolés. Une erreur est survenue et la table n'a pas pu être supprimée.")
				}
			}
		}
	}
</script>

	<style scoped>
	>>> .table:hover {
		cursor: grab;
		fill: var(--primary);
	}
	>>> .table:active {
		cursor: grabbing;
	}
	.available-table {
		font-size: 0.8rem;
	}
	.available-table:hover {
		cursor: pointer;
		background: var(--primary);
	}
	.disabled:hover {
		cursor: not-allowed;
	}
	.inset {
		padding: 10px;
		background-color: #dcdcdc;
		border: 1px solid var(--primary);
		border-radius: 10px;
	}
	#tables_plan {
		border: 2px solid var(--primary);
	}
</style>