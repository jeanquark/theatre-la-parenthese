import Vue from 'vue'
import axios from 'axios'

// state
export const state = {
    users: [],
    user: {}
}

// getters
export const getters = {
    users: state => state.users,
    user: state => state.user
}

// mutations
export const mutations = {
    SET_USERS (state, payload) {
        console.log('Set users mutation: ', payload)
        state.users = payload
    },
    SET_USER (state, payload) {
        console.log('Set user mutation: ', payload)
        state.user = payload
    },
    ADD_USER (state, payload) {
        console.log('Add user mutation: ', payload)
        state.users.push(payload)
    },
    UPDATE_USER (state, payload) {
        // console.log('Update user mutation: ', payload)
        const userId = parseInt(payload.id)
        const index = state.users.findIndex(user => user.id === userId)
        // console.log('index: ', index)
        Vue.set(state.users, index, payload)
    },
    DELETE_USER (state, payload) {
        const userId = parseInt(payload)
        console.log('userId: ', userId)
        const index = state.users.findIndex(user => user.id === userId)
        console.log('index: ', index)
        console.log('state.users: ', state.users)
        state.users.splice(index, 1)
    }
}

// actions
export const actions = {
    async fetchUsers ({ commit }) {
        try {
            console.log('fetchUsers action')
            const { data } = await axios.get('/api/users')
            console.log('data: ', data)
            commit('SET_USERS', data)
        } catch (error) {
            console.log('vuex error: ', error)
        }
    },
    async fetchUser ({ commit }, payload) {
        try {
            console.log('fetchUser action: ', payload)
            const { userId } = payload
            const { data } = await axios.get(`/api/users/${userId}`)
            console.log('data: ', data)
            commit('SET_USER', data.user)
        } catch (error) {
            console.log('vuex error: ', error)
        }
    },
    async createUser ({ commit }, payload) {
        try {
            console.log('payload: ', payload)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('image', payload.image);
            formData.append('form', JSON.stringify(payload.user))
            console.log('formData: ', formData)

            const { data } = await axios.post('/api/users', formData, config)
            console.log('data: ', data)
            commit('ADD_USER', data.newUser)
        } catch (error) {
            throw error
        }
    },
    async updateUser ({ commit }, payload) {
        try {
            console.log('updateUser: ', payload)
            const { data } = await axios.put(`/api/users/${payload.user.id}`, payload)
            console.log('data: ', data)
            commit('UPDATE_USER', data.updatedUser)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
    async updateUser2 ({ commit }, payload) {
        try {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            console.log('payload: ', payload)
            let formData = new FormData();
            formData.append('new_image', payload.new_image)
            // console.log('this.user: ', this.user)
            formData.append('form', JSON.stringify(payload.user))
            console.log('formData: ', formData)

            formData.append('_method', 'PUT')

            const { data } = await axios.post(`/api/users/${payload.user.id}`, formData, config)
            console.log('data: ', data)
            commit('UPDATE_USER', data.user)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async deleteUser ({ commit }, payload) {
        try {
            const { userId } = payload 
            console.log('userId: ', userId)
            const user = await axios.delete(`/api/users/${userId}`)
            console.log('user: ', user)
            commit('DELETE_USER', userId)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    }
}
