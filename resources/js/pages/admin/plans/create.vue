<template>
    <!-- <div> -->
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/plans" class="navigation">
                <font-awesome-icon icon="chair" />
                <span>Plans de salle</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Créer</b-breadcrumb-item>
        </b-breadcrumb>

        <!-- newTablesArray: {{ newTablesArray }}<br /><br /> -->
        <!-- newTablesSVGArray: {{ newTablesSVGArray }}<br /><br /> -->
        <!-- newTable: {{ newTable }}<br /><br /> -->
        <!-- form: {{ this.form }}<br /><br /> -->

        <h2 class="text-center">Créer un nouveau plan</h2>

        <b-row class="justify-content-center my-3 px-3">
            <b-col cols="12" md="6">
                <b-form-group label="Nom:" label-for="name">
                    <b-form-input id="name" name="name" placeholder="Nom de la page" :class="{ 'is-invalid': form.errors.has('name') }" v-model="form.name"></b-form-input>
                    <has-error :form="form" field="name" />
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
                <b-form-group label="Sélectionner le spectacle:" label-for="newPlanShow">
                    <b-form-select id="newPlanShow" name="newPerformance.show_id" :class="{ 'is-invalid': form.errors.has('newPerformance.show_id') }" @change="updateShowId" v-model="selectedShow">
                        <option v-for="show in loadedShows" :value="show" :key="show.id">{{ show.name }}</option>
                    </b-form-select>
                    <div class="help-block invalid-feedback" v-if="form.errors && form.errors.errors && form.errors.errors['newPerformance.show_id']">Veuillez séléctionner un spectacle</div>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="justify-content-start my-3 px-3" v-if="selectedShow">
            <b-col cols="12" md="6">
                <b-form-group label="Entrer un nom pour cette représentation:" name="newPerformance.name" label-for="newPerformanceName">
                    <b-form-input
                        id="newPerformanceName"
                        placeholder="Représentation n°1"
                        :class="{ 'is-invalid': form.errors.has('newPerformance.name') }"
                        v-model="newPerformance.name"
                    ></b-form-input>
                    <div class="help-block invalid-feedback" v-if="form.errors && form.errors.errors && form.errors.errors['newPerformance.name']">Le nom de la représentation est obligatoire</div>
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
                <b-form-group label="Entrer un lieu pour cette représentation:" label-for="newPerformanceLocation">
                    <b-form-input id="newPerformanceLocation" placeholder="Beaulieu, Morges" v-model="newPerformance.location"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
                <b-form-group label="Entrer une date pour cette représentation:" label-for="newPerformanceDate">
                    <VueCtkDateTimePicker
                        label="Cliquer pour choisir une date"
                        format="YYYY-MM-DD HH:mm"
                        formatted="YYYY-MM-DD HH:mm"
                        color="#9ACD32"
                        button-color="#9ACD32"
                        button-now-translation="Aujourd'hui"
                        id="newPerformanceDate"
                        v-model="newPerformance.date"
                    />
                </b-form-group>
            </b-col>
        </b-row>

        <b-row class="justify-content-center my-3">
            <b-col cols="6" sm="4" md="2" v-for="table in loadedTables" :key="table.id">
                <b-card :img-src="`/images/svg/models/model_${table.svg_id}.svg`" img-alt="Image" img-top @click="openTableDetailsModal(table)" class="available-table">
                    <b-card-text class="text-center">{{ table.name }}</b-card-text>
                </b-card>
            </b-col>
        </b-row>

        <b-row class="justify-content-center my-3">
            <b-col cols="10" @click="clickOnTablesPlan($event)">
                <svg-vue id="tables_plan" :icon="`models/model_plan`"></svg-vue>
            </b-col>

            <b-col cols="8" md="8" class="my-4">
                <div v-if="selectedTable">
                    <h4 class="text-center">Table sélectionnée: {{ selectedTable.table_number }}</h4>
                </div>
                <b-row class="justify-content-center">
                    <b-col cols="12" sm="6" md="4">
                        <svg-vue id="model_table_round_4_seats" icon="models/model_table_round_4_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_4_seats'"></svg-vue>
                        <svg-vue id="model_table_round_6_seats" icon="models/model_table_round_6_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_6_seats'"></svg-vue>
                        <svg-vue id="model_table_round_8_seats" icon="models/model_table_round_8_seats" v-show="selectedTable && selectedTable.svg_model === 'table_round_8_seats'"></svg-vue>
                    </b-col>
                    <b-col cols="12" sm="6" md="4" align-self="center" v-if="selectedTable">
                        En <b>noir</b>: siège libre, en <span style="color: #ff0000"><b>rouge</b></span
                        >: siège réservé.<br />
                        <ul>
                            <li v-for="(seat, index) in selectedTable.seats" :key="index">Place n°{{ seat['seat_number'] }}, prix: {{ seat['price'] }}</li>
                        </ul>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row class="justify-content-center my-2">
            <b-button size="sm" variant="danger" :disabled="!selectedTable" @click="deleteTable">Supprimer la table sélectionnée</b-button>
        </b-row>
        <b-row class="justify-content-center my-2">
            <b-button variant="primary" :disabled="loading" @click="createPlan">
                <b-spinner small type="grow" v-if="loading"></b-spinner>
                Créer le plan</b-button
            ><br />
        </b-row>
        <b-row class="justify-content-center">
            <b-alert variant="danger" dismissible :show="form.errors.any()">Erreur lors de l'envoi. Veuillez vérifier la validité des champs.</b-alert>
        </b-row>

        <table-details-modal :newTable="newTable" @addTable="addTable" />
    </b-container>
</template>

<script>
import Form from 'vform'
import SVG from 'svg.js'
import 'svg.draggable.js'

import TableDetailsModal from '~/components/TableDetailsModal'

// Vue date time picker
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
    components: {
        TableDetailsModal,
        VueCtkDateTimePicker
    },
    async created() {
        if (!this.$store.getters['tables/tables'].length) {
            await this.$store.dispatch('tables/fetchTables')
        }
        await this.$store.dispatch('shows/fetchShows')
        await this.$store.dispatch('performances/fetchPerformances')
    },
    mounted() {},
    data() {
        return {
            form: new Form({
                name: '',
                svg_id: ''
            }),
            selectedShow: null,
            selectedTable: null,
            newTablesArray: [],
            newTablesSVGArray: [],
            newPerformance: {
                show_id: '',
                name: '',
                location: '',
                date: ''
            },
            newTable: {}
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
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
            // this.newPlan.svg_id = randomId
            this.form.svg_id = randomId
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
        openTableDetailsModal(table) {
            // Parse newTable data
            this.newTable = { ...table, seats: [] }
            for (let i = 0; i < table.total_seats; i++) {
                this.newTable['seats'].push({ seat_number: this.formattedTableNumber(i + 1), price: 3000 })
            }

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

            this.$bvModal.show('table-details')
        },
        async addTable() {
            console.log('addTable')
            // Generate random SVG ID
            const randomId = Math.random()
                .toString(36)
                .substr(2, 9)

            // Push to new tables array
            this.newTable['svg_id'] = randomId
            this.newTable['plan_id'] = parseInt(this.$route.params.id)
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
            }
            if (this.newTable.svg_type == 'path') {
                SVG('tables_plan')
                    .path(this.newTable.d)
                    .attr({ id: randomId, 'data-svg-model': this.newTable.svg_model, 'data-total-seats': this.newTable.total_seats })
                    .draggable()
                    .addClass('table')
            }
        },
        async createPlan() {
            try {
                this.$store.commit('loading/SET_LOADING', true)

                // Remove selection ring
                if (this.selectedTable && this.selectedTable.svg_id) {
                    SVG.get(`${this.selectedTable.svg_id}_table`).attr('stroke', null)
                }

                this.form['newPlanSVG'] = SVG('tables_plan').svg()
                this.form['newPerformance'] = this.newPerformance
                this.form['newTablesArray'] = this.newTablesArray
                console.log('form: ', this.form)
                // return

                await this.$store.dispatch('plans/createPlan', this.form)

                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Le plan de salle a été créé avec succès. Vous allez être redirigé vers la page des plans.')

                setTimeout(() => {
                    window.location.href = '../plans'
                }, 1000)
            } catch (error) {
                console.log('error: ', error)
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.error("Une erreur est apparue et le plan de salle n'a pas pu être créé.")
            }
        },
        async deleteTable() {
            try {
                // Delete from newTables array if table is new
                this.newTablesArray = this.newTablesArray.filter(table => table.svg_id !== this.selectedTable.svg_id)

                SVG.get(`${this.selectedTable.svg_id}_group`).remove()
                this.selectedTable = null
            } catch (error) {
                this.$noty.error("Nous sommes désolés. Une erreur est survenue et la table n'a pas pu être supprimée.")
            }
        }
    }
}
</script>

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
.inset {
    padding: 10px;
    background-color: #dcdcdc;
    border: 1px solid $primary;
    border-radius: 10px;
}
#tables_plan {
    border: 2px solid $primary;
}
</style>
