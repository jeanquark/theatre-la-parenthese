import axios from 'axios'
import Vue from 'vue'

// state
export const state = {
    // performance: {},
    // performances: []
    performances: {}
}

// getters
export const getters = {
    // performance: state => state.performance,
    performances: state => state.performances,
}

// mutations
export const mutations = {
    // SET_PERFORMANCE (state, payload) {
    //     console.log('SET_PERFORMANCE mutation: ', payload)
    //     state.performance = payload
    // },
    SET_PERFORMANCES (state, payload) {
        console.log('SET_PERFORMANCES mutation: ', payload)
        if (Array.isArray(payload)) {
            payload.forEach(performance => {
                state.performances = Object.assign({}, state.performances, {
                    [performance.id]: performance
                })
            })
        } else {
            console.log('SET_PERFORMANCES mutation object')
            state.performances = Object.assign({}, state.performances, {
                [payload.id]: payload
            })
        }
        // state.performances = payload
        
        // state.performances = Object.assign({}, state.performances, {
        //     [payload.id]: payload
        // })

        // const performanceId = parseInt(payload.id)
        // const index = state.performances.findIndex(performance => performance.id === performanceId)
        // console.log('index: ', index)
        // if (index === -1) {
        //     state.performances.push(payload)
        // } else {
        //     state.performances[index] = payload
        // }
    },
    SET_PERFORMANCE (state, payload) {
        console.log('SET_PERFORMANCE mutation', payload)
        state.performances = Object.assign({}, state.performances, {
            [payload.id]: payload
        })
    },
    // SET_PERFORMANCE (state,  payload) {
    //     console.log('SET_PERFORMANCE mutation: ', payload)
    //     state.performance = payload
    // },
    // setPerformance (state, payload) {
    //     console.log('Set performance mutation: ', payload)
    //     const performanceId = parseInt(payload.id)

    //     // Set performance object
    //     state.performance = payload

    //     // Set performances array
    //     // const index = state.performances.findIndex(performance => performance.id === performanceId)
    //     // console.log('index: ', index)
    //     // state.performances[index] = payload
    // },
    // addPerformance (state, payload) {
    //     console.log('Add performance mutation: ', payload)
    //     state.performances.push(payload)
    // },
    UPDATE_PERFORMANCE (state, payload) {
        console.log('Update performance mutation: ', payload)

        state.performances = Object.assign({}, state.performances, {
            [payload.id]: payload
        })

        // return
        // const performanceId = parseInt(payload.id)
        // const index = state.performances.findIndex(performance => performance.id === performanceId)
        // console.log('index: ', index)
        // state.performances[index] = payload.
    },
    DELETE_PERFORMANCE (state, payload) {
        const performanceId = parseInt(payload)
        console.log('performanceId: ', performanceId)
        Vue.set(state.performances, performanceId, null)
        // const index = state.performances.findIndex(performance => performance.id === performanceId)
        // console.log('index: ', index)
        // console.log('state.performances: ', state.performances)
        // state.performances.splice(index, 1)
    }
}

// actions
export const actions = {
    async fetchPerformances ({ commit }) {
        try {
            console.log('fetchPerformances vuex action')
            const { data } = await axios.get('/api/performances')
            console.log('data: ', data)
            commit('SET_PERFORMANCES', data)
        } catch (error) {
            console.log('vuex error: ', error)
        }
    },
    // To be deleted
    // async fetchPerformance ({ commit }, payload) {
    //     try {
    //         console.log('fetchPerformance action: ', payload)
    //         const { performanceId } = payload
    //         const { data } = await axios.get(`/api/performances/${performanceId}`)
    //         console.log('data: ', data)
    //         // const array = []
    //         // array.push(data.performance)
    //         commit('SET_PERFORMANCES', data.performance)
    //         // commit('SET_PERFORMANCE', data.performance)
    //         // return { performance: data.performance }
    //     } catch (error) {
    //         console.log('vuex error: ', error)
    //     }
    // },
    async fetchPerformanceById ({ commit }, payload) {
        try {
            console.log('fetchPerformanceById action: ', payload)
            const { performanceId } = payload
            const { data } = await axios.get(`/api/performances/${performanceId}`)
            console.log('data: ', data)
            commit('SET_PERFORMANCES', data.performance)
            // commit('SET_PERFORMANCE', data.performance)
            // return { performance: data.performance }
        } catch (error) {
            console.log('vuex error: ', error)
        }
    },
    async fetchPerformancesByShow ({ commit }, payload) {
        try {
            console.log('fetchPerformanceByShow action: ', payload)
            const { showId } = payload
            const { data } = await axios.get(`/api/performances/shows/${showId}`)
            console.log('data2: ', data)
            commit('SET_PERFORMANCES', data.performances)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async createPerformance ({ commit }, payload) {
        try {
            console.log('payload: ', payload)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('image', payload.image);
            formData.append('form', JSON.stringify(payload.newPerformance))
            console.log('formData: ', formData)

            const { data } = await axios.post('/api/performances', formData, config)
            console.log('data: ', data)
            commit('SET_PERFORMANCE', data.newPerformance)
        } catch (error) {
            throw error
        }
    },
    async updatePerformance ({ commit }, form) {
        try {
            // const { id } = form
            const { data } = await form.submit('put', `/api/performances/${form.id}`)
            console.log('data: ', data)

            // const config = {
            //     headers: { 'content-type': 'multipart/form-data' }
            // }

            // let formData = new FormData();
            // formData.append('new_image', payload.new_image)
            // // console.log('this.performance: ', this.performance)
            // formData.append('form', JSON.stringify(payload.performance))
            // console.log('formData: ', formData)

            // formData.append('_method', 'PUT')

            // const { data } = await axios.post(`/api/performances/${payload.performance.id}`, formData, config)
            // console.log('data: ', data)
            commit('UPDATE_PERFORMANCE', data.updatedPerformance)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async deletePerformance ({ commit }, payload) {
        try {
            const { performanceId } = payload 
            console.log('performanceId: ', performanceId)
            const performance = await axios.delete(`/api/performances/${performanceId}`)
            console.log('performance: ', performance)
            commit('DELETE_PERFORMANCE', performanceId)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    }
}
