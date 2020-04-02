<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans" class="navigation">
                <font-awesome-icon icon="chair" />
                <span>Plans de salle</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>

        <h2 class="text-center">
            Editer plan de salle <span v-if="plan">{{ plan.id }}</span>
        </h2>
        <!-- newTablesSVGArray: {{ newTablesSVGArray }}<br /><br /> -->
        <!-- newTablesArray: {{ newTablesArray }}<br /><br /> -->
        <!-- deletedTablesArray: {{ deletedTablesArray }}<br /><br /> -->
        <!-- plan: {{ plan }}<br /><br /> -->
        <!-- selectedTable: {{ selectedTable }}<br /><br /> -->
        <!-- newTable: {{ newTable }}<br /><br /> -->
        <h4 class="text-center" v-if="plan && plan.performance">{{ plan.performance.date | moment('dddd Do MMM YYYY HH:mm') }}</h4>
        <b-row class="justify-content-center mt-5" v-if="loadingSvg">
            <!-- <font-awesome-icon icon="spinner" size="lg" spin /> -->
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </b-row>

        <b-row class="justify-content-center my-3" v-if="!loadingSvg && svgFile">
            <b-col cols="12" sm="4" md="2" v-for="table in tables" :key="table.id">
                <b-card :img-src="`/images/svg/models/model_${table.svg_id}.svg`" img-alt="Image" img-top @click="addTableModal(table)" class="available-table">
                    <b-card-text class="text-center">{{ table.name }}</b-card-text>
                </b-card>
            </b-col>
        </b-row>

        <b-row class="justify-content-center my-3" v-if="!loadingSvg && svgFile">
            <b-col cols="12" md="8" v-if="plan && plan.svg_id" @click="clickOnTablesPlan($event)">
                <div ref="svgFile" v-html="svgFile" class="primary-border"></div>
            </b-col>

            <b-col cols="8" md="8" class="my-4">
                <h4 class="text-center" v-if="selectedTable">Table sélectionnée: {{ selectedTable.table_number }}</h4>
                <!-- selectedTable: {{ selectedTable }}<br /> -->
                <!-- selectedTable.svg_model: {{ selectedTable.svg_model }} -->
                <b-row class="justify-content-center">
                    <b-col cols="12" sm="6" md="4">
                        <svg-vue id="model_table_round_4_seats" icon="models/model_table_round_4_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_4_seats'"></svg-vue>
                        <svg-vue id="model_table_round_6_seats" icon="models/model_table_round_6_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_6_seats'"></svg-vue>
                        <svg-vue id="model_table_round_8_seats" icon="models/model_table_round_8_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_8_seats'"></svg-vue>
                    </b-col>
                    <b-col cols="12" sm="6" md="4" align-self="center" v-if="selectedTable">
                        En <b>noir</b>: siège libre, en <span style="color: #ff0000"><b>rouge</b></span
                        >: siège réservé.
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row class="justify-content-center my-2" v-if="svgFile">
            <b-button size="sm" variant="danger" :disabled="!selectedTable" @click="deleteTable">Supprimer la table sélectionnée</b-button>
        </b-row>

        <b-row class="justify-content-center my-2" v-if="svgFile">
            <b-button variant="primary" :disabled="loading" @click="updatePlan">
                <b-spinner small type="grow" v-if="loading"></b-spinner>
                Editer le plan </b-button
            ><br />
        </b-row>

        <b-modal
            id="table-number"
            ref="modal"
            @ok="addTable()"
            title="Définir un numéro pour la nouvelle table"
        >
            <b-form-group
                label="Numéro de table"
                label-for="table-number-input"
                invalid-feedback="Name is required"
            >
                <b-form-input
                    id="table-number-input"
                    required
                    v-model="newTable.table_number"
                ></b-form-input>
            </b-form-group>
        </b-modal>
    </b-container>
</template>

<script>
import axios from 'axios'
import SVG from 'svg.js'
import 'svg.draggable.js'

export default {
    components: {},
    async created() {},
    async mounted() {
        try {
            const planId = parseInt(this.$route.params.id)
            this.planId = planId
            console.log('planId: ', planId)
            const planSVG = `plan_${planId}.svg`
            console.log('planSVG: ', planSVG)

            if (this.$store.getters['tables/tables'].length < 1) {
                await this.$store.dispatch('tables/fetchTables')
            }

            // if (!this.$store.getters['plans/plans'][planId]) {
                await this.$store.dispatch('plans/fetchPlanById', { planId })
            // this.svgFile = svgPlan
            // }
                // console.log('this.plan', this.plan)
            // // const fileContent = ''
            // this.svgFile = this.$store.getters['plans/plans'][planId]['svg_plan']
            this.svgFile = this.plan['svg_plan']

            // const { data } = await axios.post(`/api/plans/svg`, { planSVG })
            // console.log('data: ', data)
            // this.svgFile = data.svgPlan

            const shift = 10

            SVG.select('.table').each(function(i) {
                console.log('i: ', i)
                const shift = this.select('circle')
                    .first()
                    .attr('r')
                this.draggable({
                    minX: -(SVG('tables_plan').viewbox().width / 2 - shift),
                    maxX: SVG('tables_plan').viewbox().width / 2 + shift,
                    minY: -(SVG('tables_plan').viewbox().height / 2 - shift),
                    maxY: SVG('tables_plan').viewbox().height / 2 + shift
                })
            })

            this.loadingSvg = false
        } catch (error) {
            console.log('error: ', error)
            this.loadingSvg = false
            this.$noty.error("Le plan de table n'a pas pu être récupéré.")
        }
    },
    data() {
        return {
            loadingSvg: true,
            planId: '',
            selectedTable: null,
            newTable: {},
            newTablesSVGArray: [],
            tablesArray: [],
            newTablesArray: [],
            deletedTablesArray: [],
            svgFile: null
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        plan() {
            return this.$store.getters['plans/plans'][parseInt(this.$route.params.id)]
        },
        tables() {
            return this.$store.getters['tables/tables']
        },
        planTables() {
            return this.$store.getters['planTables/planTables']
        }
    },
    methods: {
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        formattedTableNumber(number) {
            return ('0' + number).slice(-2)
        },
        async clickOnTablesPlan(event) {
            try {
                // console.log('clickOnTablesPlan: ', event)
                const tableId = event.target.id
                // console.log('tableId: ', tableId)
                const tableSvgId = tableId.substring(0, tableId.indexOf('_'))
                // console.log('tableSvgId: ', tableSvgId)

                if (this.selectedTable && this.selectedTable.svg_id) {
                    SVG.get(`${this.selectedTable.svg_id}_table`).attr('stroke', null)
                }

                if (tableSvgId && tableId != 'tables_plan') {
                    // Clicked on a table, make it draggable inside svg plan limits
                    const tableGroup = SVG.get(`${tableSvgId}_group`)
                    const shift = tableGroup
                        .select('circle')
                        .first()
                        .attr('r')
                    // console.log('shift: ', shift)

                    tableGroup.draggable({
                        minX: -(SVG('tables_plan').viewbox().width / 2 - shift),
                        maxX: SVG('tables_plan').viewbox().width / 2 + shift,
                        minY: -(SVG('tables_plan').viewbox().height / 2 - shift),
                        maxY: SVG('tables_plan').viewbox().height / 2 + shift
                    })

                    const newTable = this.newTablesArray.find(table => table.svg_id === tableSvgId)
                    if (newTable) { // If selectedTable is a newly added table
                        this.selectedTable = newTable
                        const tableModel = SVG.select(`#model_${this.selectedTable.svg_model}`).first()
                        // console.log('tableModel: ', tableModel)
                        for (let i = 1; i <= parseInt(this.selectedTable.total_seats); i++) {
                        	const seatNumber = ('0' + i).slice(-2)
                            // console.log('seatNumber: ', seatNumber)
                        	tableModel.select(`#seat${seatNumber}_group`).first().fill('#000000')
                        	tableModel.select(`#seat${seatNumber}_group`).first().removeClass('seat')
                        	tableModel.select(`#seat${seatNumber}_text`).first().plain('')
                        }
                    } else {
                        // Existing table, show each seat number & reservation status
                        this.selectedTable = this.plan['plan_tables'].find(table => table.svg_id === tableSvgId)
                        // console.log('selectedTable: ', this.selectedTable)
                        this.selectedTable['seats'] = this.plan['plan_seats'].filter(seat => seat.plan_table_id === this.selectedTable.id)

                        const tableModel = SVG.select(`#model_${this.selectedTable.svg_model}`).first()
                        // console.log('tableModel: ', tableModel)

                        if (SVG.supported && tableModel && this.selectedTable.seats) {
                            this.selectedTable.seats.forEach(seat => {
                                // console.log('seat: ', seat)
                                const seatSvg = seat.svg_id.match(/seat\d*/gm)[0]
                                // console.log('seatSvg: ', seatSvg)

                                // Display seat number
                                const seatText = tableModel.select(`#${seatSvg}_text`).first()
                                // console.log('seatText: ', seatText)
                                seatText.plain(seat.seat_number)

                                const seatColor = tableModel.select(`#${seatSvg}_group`).first()

                                // Reserved seats are colored red
                                if (seat.is_reserved) {
                                    seatColor.fill('#FF0000')
                                    seatColor.removeClass('seat')
                                } else {
                                    seatColor.fill('#000000')
                                }
                            })
                        }
                    }
                    // Draw a border around selected table
                    if (this.selectedTable) {
                        SVG.get(`${tableSvgId}_table`)
                            .attr('stroke', '#FF0000')
                            .attr('stroke-width', 1)
                    }
                } else {
                    // Clicked on a blank space
                    this.selectedTable = null
                }
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("La table n'a pas pu être trouvée dans la base de données.")
            }
        },
        async addTableModal (table) {
            this.newTable = { ...table }
            // const shift = table.r / 2
            

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
            this.newTable.table_number = tableNumber
            this.$bvModal.show('table-number')
        },
        async addTable() {
            // Generate random SVG ID
            const randomId = Math.random()
                .toString(36)
                .substr(2, 9)

            // Push to new tables array
            this.newTable['svg_id'] = randomId
            this.newTable['plan_id'] = parseInt(this.$route.params.id)
            // this.newTable['table_number'] = tableNumber
            this.newTablesArray.push(this.newTable)

            const shift = this.newTable.r / 2

            // Add table to plan
            if (this.newTable.svg_type === 'circle') {
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

                newTableSVG.circle(this.newTable.r).attr({
                    cx: SVG('tables_plan').viewbox().width / 2,
                    cy: SVG('tables_plan').viewbox().height / 2,
                    id: `${randomId}_table`,
                    'data-svg-model': this.newTable.svg_model,
                    'data-total-seats': this.newTable.total_seats,
                    'data-table-number': this.newTable.table_number
                })

                newTableSVG
                    .text('')
                    .attr({ id: `${randomId}_text` })
                    .tspan(this.newTable.table_number)
                    .attr({ id: `${randomId}_span` })
                    .font({
                        family: 'Helvetica',
                        size: 10,
                        dx: SVG('tables_plan').viewbox().width / 2 - 6,
                        dy: SVG('tables_plan').viewbox().height / 2 + 3,
                        fill: '#9ACD32'
                    })

                this.newTablesSVGArray.push({
                    id: randomId,
                    tableSVGId: randomId,
                    svg: SVG.get(`${randomId}_table`).svg()
                })
            }
            if (this.newTable.svg_type == 'path') {
                SVG('tables_plan')
                    .path(this.newTable.d)
                    .attr({ id: randomId, 'data-svg-model': this.newTable.svg_model, 'data-total-seats': this.newTable.total_seats })
                    .draggable()
                    .addClass('table')
            }
        },
        async updatePlan() {
            try {
                console.log('updatePlan')
                this.$store.commit('loading/SET_LOADING', true)

                // Remove selection ring
                if (this.selectedTable && this.selectedTable.svg_id) {
                    SVG.get(`${this.selectedTable.svg_id}_table`).attr('stroke', null)
                }
                // return

                const planSvgId = this.plan.svg_id
                const newPlanSVG = SVG('tables_plan')
                    .svg()
                    .replace('xmlns:svgjs="http://svgjs.com/svgjs"', '')

                const newTablesArray = this.newTablesArray
                const deletedTablesArray = this.deletedTablesArray
                const newTablesSVGArray = this.newTablesSVGArray
                console.log('planSvgId: ', planSvgId)
                // console.log('newPlanSVG: ', newPlanSVG)
                console.log('newTablesSVGArray: ', newTablesSVGArray)
                console.log('tablesArray: ', newTablesArray)
                await this.$store.dispatch('plans/updatePlan', { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG })
                this.$store.commit('loading/SET_LOADING', false, { root: true })
                this.$noty.success('Le plan de salle a été mis à jour avec succès!')
                // this.$router.push('/admin/plans')
                setTimeout(() => {
                    window.location.href = '../../plans'
                }, 1000)
            } catch (error) {
                this.$store.commit('loading/SET_LOADING', false, { root: true })
                console.log('error: ', error)
                this.$noty.error("Une erreur est apparue et le plan de salle n'a pas pu être mis à jour.")
            }
        },
        async deleteTable() {
            try {
                // Check to see if table has reserved seats
                if (this.selectedTable.seats) {
                    const reservedSeats = this.selectedTable.seats.filter(seat => seat.is_reserved == true)
                    if (reservedSeats.length > 0) {
                        this.$noty.error('Un ou plusieurs sièges de cette table sont réservés. Veuillez supprimer les réservations avant de pouvoir supprimer cette table.')
                        return
                    }
                }
                this.deletedTablesArray.push(this.selectedTable)
                SVG.get(`${this.selectedTable.svg_id}_group`).remove()
                this.selectedTable = null
                this.$noty.success('La table a été supprimée avec succès!')
            } catch (error) {
                if (error.response && error.response.status && error.response.satus === 409) {
                    this.$noty.error("La table n'a pas pu être supprimée car au moins l'un de ses sièges est réservé.")
                } else {
                    this.$noty.error("Nous sommes désolés. Une erreur est survenue et la table n'a pas pu être supprimée.")
                }
            }
        },
        reloadPage() {
            window.location.reload()
            this.$noty.success('Le plan de salle a été mis à jour avec succès.')
        }
    }
}
</script>

<style scoped></style>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
::v-deep .table:hover {
    cursor: grab;
    fill: $primary;
}
::v-deep .table:active {
    cursor: grabbing;
}
.available-table {
    font-size: 0.8rem;
}
.available-table:hover {
    cursor: pointer;
    background: $primary;
}
.disabled:hover {
    cursor: not-allowed;
}
.circle:hover {
    /*cursor: grab;*/
    cursor: grabbing;
    fill: yellow;
}
.circle:active {
    cursor: grabbing;
}
.primary-border {
    border: 2px solid $primary;
}
</style>
