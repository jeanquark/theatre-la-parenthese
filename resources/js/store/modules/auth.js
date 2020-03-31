import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'
import jwt_decode from 'jwt-decode'

// state
export const state = {
    user: null,
    token: Cookies.get('token')
}

// getters
export const getters = {
    user: state => state.user,
    token: state => state.token,
    check: state => state.user !== null
}

// mutations
export const mutations = {
    [types.SAVE_TOKEN](state, { token, remember }) {
        state.token = token
        Cookies.set('token', token, { expires: remember ? 365 : null })
    },

    // [types.FETCH_USER_SUCCESS](state, { user }) {
    //     state.user = user
    // },
    SET_USER (state, payload) {
        const { user } = payload
        state.user = user
    },

    [types.FETCH_USER_FAILURE](state) {
        state.token = null
        Cookies.remove('token')
    },

    // [types.LOGOUT](state) {
    //     state.user = null
    //     state.token = null

    //     Cookies.remove('token')
    // },
    SET_LOGOUT (state) {
        console.log('Call to SET_LOGOUT vuex mutation')
        state.user = null
        state.token = null
        Cookies.remove('token')
    },

    [types.UPDATE_USER](state, { user }) {
        state.user = user
    }
}

// actions
export const actions = {
    saveToken({ commit, dispatch }, payload) {
        commit(types.SAVE_TOKEN, payload)
    },

    async fetchUser({ commit }) {
        try {
            const { data } = await axios.get('/api/user')
            console.log('data from fetchUser: ', data)

            // commit(types.FETCH_USER_SUCCESS, { user: data })
            commit('SET_USER', { user: data })
        } catch (error) {
            // commit(types.FETCH_USER_FAILURE)
            console.log('error: ', error)
        }
    },

    updateUser({ commit }, payload) {
        commit(types.UPDATE_USER, payload)
    },

    async logout({ commit, state }) {
        try {
            console.log('Call to logout vuex action')
            const token = state.token
            // console.log('token: ', token)
            const { exp } = jwt_decode(token)
            // console.log('exp: ', exp)
            let tokenIsExpired = false
            if (Date.now() >= exp * 1000) {
                tokenIsExpired = true
            }
            if (!tokenIsExpired) {
                await axios.post('/api/logout')
            }
            // commit(types.LOGOUT)
            commit('SET_LOGOUT')
        } catch (error) {
            console.log('error: ', error)
        }
    },

    async fetchOauthUrl(ctx, { provider }) {
        const { data } = await axios.post(`/api/oauth/${provider}`)

        return data.url
    }
}
