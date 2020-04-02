import Vue from 'vue'
import axios from 'axios'

// state
export const state = {
    plans: {}
}

// getters
export const getters = {
    plans: state => state.plans
}

// mutations
export const mutations = {
    SET_PLAN (state, payload) {
        console.log('SET_PLAN mutation', payload)
        state.plans = Object.assign({}, state.plans, {
            [payload.id]: payload
        })
    },
    SET_PLANS (state, payload) {
        console.log('SET_PLANS mutation', payload)
        payload.forEach(plan => {
            state.plans = Object.assign({}, state.plans, {
                [plan.id]: plan
            })
        })
    },
    ADD_PLAN (state, payload) {
        console.log('ADD_PLAN mutation: ', payload)
        const index = state.plans.findIndex(plan => plan.id === payload.id)
        console.log('index2: ', index)
        if (index === -1) {
            state.plans.push(payload)
        }
    },
    UPDATE_PLAN (state, payload) {
        console.log('UPDATE_PLAN mutation', payload)
        const planId = payload.table.plan_id
        const index = state.plans[planId]['plan_seats'].findIndex(seat => seat.id === payload.id)
        console.log('index: ', index)
        state.plans[planId] = Object.assign({}, state.plans[planId], {
            ['plan_seats']: [ 
                ...state.plans[planId]['plan_seats'].slice(0, index),
                payload,
                ...state.plans[planId]['plan_seats'].slice(index + 1)
            ]
        })
    },
    DELETE_PLAN (state, payload) {
        console.log('DELETE_PLAN: ', payload)
        const { planId } = payload
        console.log('planId: ', planId)
        Vue.set(state.plans, planId, null)
    }
}

// actions
export const actions = {
    async fetchPlans ({ commit }) {
        try {
            console.log('fetchPlans action')
            const { data } = await axios.get(`/api/plans`) 
            console.log('data: ', data)
            commit('SET_PLANS', data.plans)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async fetchPlanById ({ commit }, payload) {
        try {
            console.log('fetchPlan action: ', payload)
            const { planId } = payload
            const { data } = await axios.get(`/api/plans/${planId}`)
            console.log('data2: ', data)
            const abc = { ...data.plan, svg_plan: data.svgPlan }
            console.log('abc2: ', abc)
            commit('SET_PLAN', { ...data.plan, svg_plan: data.svgPlan })
            // return { svgPlan: data.svgPlan }
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async createPlan ({ commit }, payload) {
        try {
            const { newPlanSVG, newPlan, newPerformance, newTablesArray } = payload
            const abc = await axios.post('/api/plans', { newPlanSVG, newPlan, newPerformance, newTablesArray })
            console.log('abc: ', abc)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async updatePlan ({ commit }, payload) {
        try {
            console.log('Call to updatePlan action: ', payload)
            const { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG } = payload
            await axios.put(`/api/plans/${planSvgId}`, { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG })
            // const abc = await axios.put(`/api/plans/${planSvgId}`, { planSvgId, newTablesArray, deletedTablesArray, newPlanSVG })
            // console.log('abc: ', abc)
            // return abc
        } catch (error) {
            throw error
        }
    },
    async deletePlan ({ commit }, payload) {
        try {
            const { planId } = payload
            const { data } = await axios.delete(`/api/plans/${planId}`)
            console.log('data: ', data)
            commit('DELETE_PLAN', { planId })
        } catch (error) {
            throw error
        }
    }
}
