// state
export const state = {
    countdown: false
}

// getters
export const getters = {
    countdown: state => state.countdown

}

// mutations
export const mutations = {
    SET_COUNTDOWN(state, payload) {
        console.log('SET_COUNTDOWN mutation: ', payload)
        state.countdown = payload
    }
}

// actions
export const actions = {
}
