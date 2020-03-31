import Vue from 'vue'
import axios from 'axios'
import * as types from '../mutation-types'
import { CardPlugin } from 'bootstrap-vue'

// state
export const state = {
    // planSeats: {
    //     25: {
    //         id: 25
    //     }
    // },
    planSeats: {},
    userSeats: []
}

// getters
export const getters = {
    planSeats: state => state.planSeats,
    userSeats: state => state.userSeats
}

// mutations
export const mutations = {
    // addUserSeat (state, payload) {
    //     console.log('Add user seat mutation: ', payload)
    //     state.userSeats.push(payload)
    // },
    SET_PLAN_SEATS (state, payload) {
        console.log('SET_PLAN_SEATS: ', payload)
        state.planSeats = Object.assign({}, state.planSeats, {
            [payload.planId]: payload.seats
        })
    },
    SET_USER_SEATS (state, payload) {
        console.log('SET_USER_SEATS: ', payload)
        state.userSeats = payload
    },
    UPDATE_PLAN_SEATS (state, payload) {
        console.log('UPDATE_PLAN_SEATS mutation: ', payload)
        const { updatedSeat } = payload
        const seat = {
            [updatedSeat.id]: { ...updatedSeat }
        }
        state.planSeats = { ...state.planSeats, ...seat }

        // const index = state.planSeats.findIndex(planSeat => planSeat.id == updatedSeat.id)
        // state.planSeats[index] = updatedSeat
    },
    REMOVE_FROM_USER_SEATS (state, payload) {
        console.log('REMOVE_FROM_USER_SEATS', payload)
        const { removedSeatId } = payload
        const index = state.userSeats.findIndex(seat => seat.id === removedSeatId)
        console.log('index: ', index)
        // if (index !== -1) {
            state.userSeats.splice(index, 1)
        // }
    }
}

// actions
export const actions = {
    async fetchPlanSeats ({ commit }, payload) {
        try {
            console.log('fetchPlanSeats action: ', payload)
            const { planId } = payload
            const { data } = await axios.get(`/api/plan-seats/${planId}`)
            console.log('data from fetchPlanSeats: ', data)
            commit('SET_PLAN_SEATS', data)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async fetchUserSeats ({ commit }, payload) {
        try {
            console.log('fetchUserSeats action: ', payload)
            const { userId } = payload
            const { data } = await axios.get(`/api/plan-seats/users/${userId}`)
            console.log('data2: ', data)
            // commit(types.FETCH_USER_SEATS, data)
            commit('SET_USER_SEATS', data)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async updatePlanSeats ({ commit }, payload) {
        try {
            console.log('updatePlanSeats action: ', payload)
            const { data } = await axios.post('/api/plan-seats/reserve-a-seat', payload)
            console.log('data: ', data)
            commit('plans/UPDATE_PLAN', data.updatedSeat, { root: true })
            commit('shoppingCart/ADD_TO_SHOPPING_CART', data.updatedSeat, { root: true })
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async confirmPlanSeatReservation ({ commit, dispatch }, payload) {
        try {
            const { data } = await axios.post('/api/plan-seats/confirm-seat-reservation', payload)
            console.log('data3: ', data)
            data.confirmedPlanSeats.forEach(planSeat => {
                commit('shoppingCart/REMOVE_FROM_SHOPPING_CART', { removedSeatId: planSeat.id }, { root: true })
                // commit('shoppingCart/UPDATE_SHOPPING_CART', data.planSeat, { root: true })
            })
            await dispatch('fetchUserSeats', { userId: data.userId })
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async deletePlanSeatPreReservation ({ commit }, payload) {
        try {
            const { planSeatId } = payload
            console.log('deletePlanSeatPreReservation: ', planSeatId)
            const { data } = await axios.post(`/api/plan-seats/delete-seat-reservation`, { planSeatId })
            console.log('data4: ', data)

            // commit('REMOVE_FROM_USER_SEATS', { removedSeatId: planSeatId })
            commit('shoppingCart/REMOVE_FROM_SHOPPING_CART', { removedSeatId: planSeatId }, { root: true })
            // commit('plans/UPDATE_PLAN', data.planSeat, { root: true })
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async deletePlanSeatConfirmedReservation ({ commit }, payload) {
        try {
            const { planSeatId } = payload
            console.log('deletePlanSeatConfirmedReservation: ', planSeatId)
            const { data } = await axios.post(`/api/plan-seats/delete-seat-reservation`, { planSeatId })
            console.log('date: ', data)
            commit('REMOVE_FROM_USER_SEATS', { removedSeatId: planSeatId })
            // commit('plans/UPDATE_PLAN', data.planSeat, { root: true })
            // commit('shoppingCart/REMOVE_FROM_SHOPPING_CART', { removedSeat: data.planSeat }, { root: true })
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    }
}