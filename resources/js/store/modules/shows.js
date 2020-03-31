import axios from 'axios'

// state
export const state = {
    shows: [],
    show: {}
}

// getters
export const getters = {
    shows: state => state.shows,
    show: state => state.show
}

// mutations
export const mutations = {
    SET_SHOWS (state, payload) {
        console.log('Set shows mutation: ', payload)
        state.shows = payload
    },
    SET_SHOW (state, payload) {
        console.log('Set show mutation: ', payload)
        state.show = payload
    },
    ADD_SHOW (state, payload) {
        console.log('Add show mutation: ', payload)
        state.shows.push(payload)
    },
    UPDATE_SHOW (state, payload) {
        console.log('Update show mutation: ', payload)
        const showId = parseInt(payload.id)
        const index = state.shows.findIndex(show => show.id === showId)
        console.log('index: ', index)
        state.shows[index] = payload
    },
    DELETE_SHOW (state, payload) {
        const showId = parseInt(payload)
        console.log('showId: ', showId)
        const index = state.shows.findIndex(show => show.id === showId)
        console.log('index: ', index)
        console.log('state.shows: ', state.shows)
        state.shows.splice(index, 1)
    }
}

// actions
export const actions = {
    async fetchShows ({ commit }) {
        try {
            console.log('fetchShows vuex action')
            const { data } = await axios.get('/api/shows')
            console.log('data: ', data)
            commit('SET_SHOWS', data)
        } catch (error) {
            console.log('vuex error: ', error)
        }
    },
    // async fetchShow ({ commit }, payload) {
    //     try {
    //         console.log('fetchShow action: ', payload)
    //         const { showId } = payload
    //         const { data } = await axios.get(`/api/shows/${showId}`)
    //         console.log('data: ', data)
    //         commit('setShow', data.show)
    //     } catch (error) {
    //         console.log('vuex error: ', error)
    //     }
    // },
    async createShow ({ commit }, payload) {
        try {
            console.log('payload: ', payload)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('image', payload.image);
            formData.append('form', JSON.stringify(payload.newShow))
            console.log('formData: ', formData)

            const { data } = await axios.post('/api/shows', formData, config)
            console.log('data: ', data)
            commit('ADD_SHOW', data.newShow)
        } catch (error) {
            throw error
        }
    },
    async updateShow ({ commit }, payload) {
        try {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('new_image', payload.new_image)
            // console.log('this.show: ', this.show)
            formData.append('form', JSON.stringify(payload.show))
            console.log('formData: ', formData)

            formData.append('_method', 'PUT')

            const { data } = await axios.post(`/api/shows/${payload.show.id}`, formData, config)
            console.log('data: ', data)
            commit('UPDATE_SHOW', data.show)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async deleteShow ({ commit }, payload) {
        try {
            const { showId } = payload 
            console.log('showId: ', showId)
            const show = await axios.delete(`/api/shows/${showId}`)
            console.log('show: ', show)
            commit('DELETE_SHOW', showId)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    }
}
