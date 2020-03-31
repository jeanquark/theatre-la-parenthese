import axios from 'axios'
// import * as types from '../mutation-types'

// state
export const state = {
    planTables: [],
    // tableSeats: {}
}

// getters
export const getters = {
    planTables: state => state.planTables,
    // tableSeats: state => state.tableSeats
}

// mutations
export const mutations = {
    // [types.FETCH_PLAN_TABLES] (state, payload) {
    //     console.log('Plan Tables mutation: ', payload)
    //     state.planTables = payload
    // },
    // [types.FETCH_SEATS_BY_TABLE] (state, payload) {
    //     console.log('Mutation fetch seats by tables: ', payload)
    //     state.tableSeats = Object.assign({}, state.tableSeats, {
    //         [payload.table.svg_id]: payload.seats
    //     })
    // },
    SET_PLAN_TABLES (state, payload) {
        state.planTables = payload
    }
}

// actions
export const actions = {
    async fetchPlanTables ({ commit }) {
        try {
            console.log('fetchPlanTables action')
            const { data } = await axios.get('/api/plan-tables')
            console.log('data: ', data)
            commit('SET_PLAN_TABLES', data)
        } catch (error) {
            console.log('vuex error: ', error)
            // commit(types.FETCH_USER_FAILURE)
        }
    },
    async fetchPlanTablesByPlanId ({ commit }, payload) {
        try {
            console.log('fetchPlanTablesByPlanId: ', payload)
            const { planId } = payload
            const { data } = await axios.get(`/api/plan-tables/planId/${planId}`)
            console.log('data: ', data)
            commit('SET_PLAN_TABLES', data)
            // return data
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async fetchSeatsByTable ({ commit }, payload) {
        try {
            console.log('fetchSeatsByTable action: ', payload)
            const { tableSvgId } = payload
            const { data } = await axios.get(`/api/plan-tables/${tableSvgId}`)
            console.log('data2: ', data)
            // commit(types.FETCH_SEATS_BY_TABLE, data)
            // commit('tableSeats/SET_TABLE_SEATS', data, { root: true })
            // commit('SET_PLAN_TABLES', data)

        } catch (error) {
            console.log('vuex error: ', error)
            // commit(types.FETCH_USER_FAILURE)
            throw error
        }
    },
    async TOBEDELETED_createPlanTable ({ commit }, payload) {
        try {
            const { newPlanSVG, newTablesArray, newPerformance } = payload
            const abc = await axios.post('/api/plan-tables', { newPlanSVG, newTablesArray, newPerformance })
            console.log('abc: ', abc)
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async TOBEDELETED_updatePlanTable ({ commit }, payload) {
        try {
            console.log('Call to updatePlanTable action: ', payload)
            const { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG } = payload
            const abc = await axios.put('/api/plan-tables', { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG })
            console.log('abc: ', abc)
            // return abc
        } catch (error) {
            throw error
        }
    },
    async deletePlanTable ({ commit }, payload) {
        try {
            console.log('Call to deletePlanTable action: ', payload)
            const { planTableSvgId } = payload
            console.log('planTableSvgId: ', planTableSvgId)
            const { data } = await axios.delete(`/api/plan-tables/${planTableSvgId}`)

            // Update plan
            await axios.put('/api/plan-tables', { newPlanSVG })
            console.log('data: ', data)
            // commit()
        } catch (error) {
            // console.log('error2: ', error)
            // console.log('error2.response: ', error.response)
            // console.log('error2.response.data: ', error.response.data)
            throw error
            // throw new Error(error)
        }

    }
}
