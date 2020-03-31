import axios from 'axios'

// state
export const state = {
    // tests: {},
    tableSeats: {}
}

// getters
export const getters = {
    // tests: state => state.tests,
    tableSeats: state => state.tableSeats
    // tableSeats: (state) => {
    //     return state.tableSeats
    // }
}

// mutations
export const mutations = {
    SET_TABLE_SEATS (state, payload) {
        console.log('SET_TABLE_SEATS mutation: ', payload)
        state.tableSeats = Object.assign({}, state.tableSeats, {
            [payload.svg_id]: payload.seats
        })
    },
    updateTableSeat (state, payload) {
        console.log('updateTableSeat mutation: ', payload)
        const tableSeat = payload
        console.log('tableSeat: ', tableSeat)
        const tableSvgId = tableSeat.table.svg_id
        console.log('tableSvgId: ', tableSvgId)

		if (state.tableSeats && state.tableSeats[tableSvgId]) {
			const index = state.tableSeats[tableSvgId].findIndex(seat => seat.id === tableSeat.id)
			console.log('index: ', index)

			const tableSeatsArray = [ ...state.tableSeats[tableSvgId]]
			tableSeatsArray[index] = payload
			console.log('tableSeatsArray: ', tableSeatsArray)
			state.tableSeats = Object.assign({}, state.tableSeats, {
				[tableSvgId]: tableSeatsArray
			})
		}
        


        // state.tests = [
        //     ...state.tests.filter(element => seat.id !== payload.id),
        //     payload
        // ]
        // state.tests['abc'] = payload
        // state.tests = 'abc'
        // state.tests = { name: 'abc' }
        // state.tests['abc'] = payload
        // state.tests = Object.assign({}, state.tests, {
        //     [payload.id]: payload
        // })
    }
}

// actions
export const actions = {
    async fetchTableSeats ({ commit }, payload) {
        try {
            console.log('fetchTableSeats action: ', payload)
            const { tableSvgId } = payload
            const { data } = await axios.get(`/api/plan-tables/${tableSvgId}`)
            console.log('data: from fetchTableSeats action ', data)
            commit('SET_TABLE_SEATS', data)
        } catch (error) {
            console.log('vuex error: ', error)
            // commit(types.FETCH_USER_FAILURE)
        }
    },
    async reserveASeat ({ commit}, payload ) {
        try {
            const { planTableId, seatSvgId } = payload
            console.log('seatSvgId: ', seatSvgId)
            const { data } = await axios.post('/api/plan-seats/reserve-a-seat', { planTableId, seatSvgId })
            console.log('data from reserveASeat: ', data)

            commit('plans/UPDATE_PLAN', data.updatedSeat, { root: true })
            commit('shoppingCart/ADD_TO_SHOPPING_CART', data.updatedSeat, { root: true })
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
}
