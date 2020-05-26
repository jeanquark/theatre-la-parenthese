<template>
    <b-modal size="lg" id="table-details" ref="modal" @ok="$emit('addTable')" title="Détails de la nouvelle table">
            <!-- newTable: {{ newTable }}<br /><br /> -->
            <!-- newTable.seats[0]: {{ newTable.seats[0] }}<br /><br /> -->
            <b-row no-gutters>
                <b-col cols="12" md="6" class="px-3">
                    <b-form-group label="Numéro de table" label-for="table-number-input" invalid-feedback="Name is required">
                        <b-form-input id="table-number-input" required v-model="newTable.table_number"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6" class="px-3">
                    <b-form-group label="Nombre de sièges">
                        <b-form-input readonly v-model="newTable.total_seats"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row no-gutters>
                <b-col cols="12" md="6" class="px-3" v-for="(seat, index) in newTable.seats" :key="index">
                    <b-row no-gutters align-v="center">
                        <b-col cols="6" class="px-1">
                            <b-form-group :label="`N° siège ${index + 1}`" :description="`${(newTable.seats[index]['price'] / 100).toFixed(2)} CHF`" label-for="">
                                <b-form-input id="" v-model="newTable.seats[index]['seat_number']"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6" class="px-1">
                            <b-form-group :label="`Prix siège ${index + 1} (centimes)`" label-for="" :description="`= ${(newTable.seats[index]['price'] / 100).toFixed(2)} CHF`">
                                <b-form-input id="" type="number" required v-model="newTable.seats[index]['price']"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-modal>
</template>

<script>
export default {
    props: [ 'newTable' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
</style>