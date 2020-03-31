import axios from 'axios'

// state
export const state = {
	loading: false
}

// getters
export const getters = {
	loading: state => state.loading
}

// mutations
export const mutations = {
	SET_LOADING (state, payload) {
		// console.log('SET_LOADING')
		state.loading = payload
	}
}

// actions
export const actions = {

}
