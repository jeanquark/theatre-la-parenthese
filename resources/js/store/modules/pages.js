import Vue from 'vue'
import axios from 'axios'
import { objectToFormData } from 'object-to-formdata'

// state
export const state = {
	pages: {}
}

// getters
export const getters = {
	pages: state => state.pages
}

// mutations
export const mutations = {
	SET_PAGES (state, payload) {
		console.log('SET_PAGES: ', payload)
		payload.forEach(page => {
            state.pages = Object.assign({}, state.pages, {
                [page.id]: page
            })
        })
	},
	SET_PAGE (state, payload) {
		console.log('SET_PAGE: ', payload)
		state.pages = Object.assign({}, state.pages, {
            [payload.id]: payload
        })
	},
	DELETE_PAGE (state, payload) {
        console.log('DELETE_PAGE: ', payload)
        const { pageId } = payload
        console.log('pageId: ', pageId)
		Vue.delete(state.pages, pageId)
    }
}

// actions
export const actions = {
	async fetchPages ({ commit }) {
		try {
			console.log('fetchPages vuex action')
			const { data } = await axios.get(`/api/pages`)
			console.log('data: ', data)
			commit('SET_PAGES', data)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async fetchPageById ({ commit }, payload) {
		try {
			console.log('fetchPageById vuex action: ', payload)
			const { pageId } = payload
			const { data } = await axios.get(`/api/pages/${pageId}`)
			console.log('data: ', data)
			commit('SET_PAGE', data.page)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async fetchPageBySlug ({ commit }, payload) {
		try {
			console.log('fetchPageBySlug vuex action: ', payload)
			let { pageSlug } = payload
			if (!pageSlug) {
				pageSlug = 'accueil'
			}
			const { data } = await axios.get(`/api/pages/slug/${pageSlug}`)
			console.log('data: ', data)
			commit('SET_PAGE', data.page)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	// async fetchPageBySlug2 ({ commit }, payload) {
	// 	try {
	// 		// const slug = payload
	// 		console.log('fetchPageBySlug vuex action: ', payload)
	// 		const { data } = await axios.get(`/api/pages/${payload}`)
	// 		console.log('data: ', data)
	// 		commit('SET_PAGE', data.page)
	// 	} catch (error) {
	// 		console.log('error: ', error)
	// 		throw error
	// 	}
	// },
	async createPage ({ commit }, form) {
        try {
			console.log('createPage action: ', form)

        	const { data } = await form.submit('post', '/api/pages', {
                transformRequest: [
                    function(data, headers) {
                        return objectToFormData(data)
                    }
                ]
            })
            console.log('data: ', data)
            commit('SET_PAGE', data.newPage)
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    },
	async updatePage ({ commit }, form) {
		try {
			console.log('updatedPage vuex action: ', form)
			const updatedPage = form
			console.log('updatedPage: ', updatedPage)

			const { data } = await form.submit('post', `/api/pages/${updatedPage.id}`, {
                transformRequest: [
                    function(data, headers) {
                    	data['_method'] = 'PUT'
                        return objectToFormData(data)
                    }
                ]
            })

			console.log('data: ', data)
			commit('SET_PAGE', data.updatedPage)
		} catch (error) {
			console.log('error: ', error)
			throw error
		}
	},
	async deletePage ({ commit }, payload) {
        try {
            const { pageId } = payload
            console.log('pageId: ', pageId)
            const { data } = await axios.delete(`/api/pages/${pageId}`)
            console.log('data2: ', data)
            commit('DELETE_PAGE', { pageId })
        } catch (error) {
			console.log('error: ', error)
            throw error
        }
    }
}
