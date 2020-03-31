import Vue from 'vue'
import axios from 'axios'

// state
export const state = {
	pages: {}
}

// getters
export const getters = {
	pages(state) {
		return state.pages
	}
}

// mutations
export const mutations = {
	SET_PAGES (state, payload) {
		console.log('SET_PAGES: ', payload)
		payload.forEach(page => {
            state.pages = Object.assign({}, state.pages, {
                [page.slug]: page
            })
        })
	},
	SET_PAGE (state, payload) {
		console.log('SET_PAGE: ', payload)
		state.pages = Object.assign({}, state.pages, {
            [payload.slug]: payload
        })
	},
	DELETE_PAGE (state, payload) {
        console.log('DELETE_PAGE: ', payload)
        const { pageSlug } = payload
        console.log('pageSlug: ', pageSlug)
        Vue.set(state.pages, pageSlug, null)
    }
}

// actions
export const actions = {
	async fetchPages ({ commit }) {
		try {
			console.log('fetchPages vuex action')
			const { data } = await axios.get(`/api/pages`)
			console.log('data: ', data)
			commit('SET_PAGES', data.pages)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async fetchPageBySlug ({ commit }, payload) {
		try {
			// const slug = payload
			console.log('fetchPageBySlug vuex action: ', payload)
			const { data } = await axios.get(`/api/pages/${payload}`)
			console.log('data: ', data)
			commit('SET_PAGE', data.page)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async createPage ({ commit }, payload) {
        try {
			console.log('payload: ', payload)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            let formData = new FormData();
            formData.append('form', JSON.stringify(payload.newPage))
            console.log('formData: ', formData)

            const { data } = await axios.post('/api/pages', formData, config)
            console.log('data: ', data)
            commit('SET_PAGE', data.newPage)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
	async updatePage ({ commit }, payload) {
		try {
			console.log('updatedPage vuex action: ', payload)
			const updatedPage = payload
			const { data } = await axios.put(`/api/pages/${updatedPage.slug}`, { updatedPage })
			console.log('data: ', data)
			commit('SET_PAGE', data.page)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async deletePage ({ commit }, payload) {
        try {
            const { pageId } = payload
            const { data } = await axios.delete(`/api/pages/${pageId}`)
            console.log('data: ', data)
            commit('DELETE_PAGE', { pageSlug: data.page.slug })
        } catch (error) {
            throw error
        }
    }
}
