import axios from 'axios'

// state
export const state = {
    members: [],
    member: {}
}

// getters
export const getters = {
    members: state => state.members,
    member: state => state.member
}

// mutations
export const mutations = {
    setMembers (state, payload) {
        console.log('Set members mutation: ', payload)
        state.members = payload
    },
    setMember (state, payload) {
        console.log('Set member mutation: ', payload)
        state.member = payload
    },
    ADD_MEMBER (state, payload) {
        console.log('ADD_MEMBER mutation: ', payload)
        const index = state.members.findIndex(member => member.id === payload.id)
        console.log('index: ', index)
        if (index === -1) {
            state.members.push(payload)
        }
    },
    updateMember (state, payload) {
        console.log('Update member mutation: ', payload)
        const memberId = parseInt(payload.id)
        const index = state.members.findIndex(member => member.id === memberId)
        console.log('index: ', index)
        state.members[index] = payload
    },
    deleteMember (state, payload) {
        const memberId = parseInt(payload)
        console.log('memberId: ', memberId)
        const index = state.members.findIndex(member => member.id === memberId)
        console.log('index: ', index)
        console.log('state.members: ', state.members)
        state.members.splice(index, 1)
    }
}

// actions
export const actions = {
    async fetchMembers ({ commit }) {
        try {
            console.log('fetchMembers action')
            const { data } = await axios.get('/api/members')
            console.log('data: ', data)
            commit('setMembers', data)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async fetchMember ({ commit }, payload) {
        try {
            console.log('fetchMember action: ', payload)
            const { memberId } = payload
            const { data } = await axios.get(`/api/members/${memberId}`)
            console.log('data: ', data)
            commit('setMember', data.member)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async createMember ({ commit }, form) {
        try {
            console.log('createMember vuex action: ', form)
            const { data } = await form.post('/api/members')
            console.log('data: ', data)
            commit('ADD_MEMBER', data.newMember)
        } catch (error) {
            console.log('vuex error: ', error)
            throw error
        }
    },
    async createMember2 ({ commit }, payload) {
        try {
            console.log('payload: ', payload)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('image', payload.image);
            formData.append('form', JSON.stringify(payload.member))
            console.log('formData: ', formData)

            const { data } = await axios.post('/api/members', formData, config)
            // const { data } = await this.form.post('/api/login')
            console.log('data: ', data)
            commit('addMember', data.newMember)
        } catch (error) {
            throw error
        }
    },
    async updateMember ({ commit }, payload) {
        try {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('new_image', payload.new_image)
            // console.log('this.member: ', this.member)
            formData.append('form', JSON.stringify(payload.member))
            console.log('formData: ', formData)

            formData.append('_method', 'PUT')

            const { data } = await axios.post(`/api/members/${payload.member.id}`, formData, config)
            console.log('data: ', data)
            commit('updateMember', data.member)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    },
    async deleteMember ({ commit }, payload) {
        try {
            const { memberId } = payload 
            console.log('memberId: ', memberId)
            const member = await axios.delete(`/api/members/${memberId}`)
            console.log('member: ', member)
            commit('deleteMember', memberId)
        } catch (error) {
            console.log('error from vuex: ', error)
            throw error
        }
    }
}
