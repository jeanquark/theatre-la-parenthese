// state
export const state = {
    shoppingCart: []
}

// getters
export const getters = {
    shoppingCart: state => state.shoppingCart
}

// mutations
export const mutations = {
    SET_SHOPPING_CART(state, payload) {
        console.log('SET_SHOPPING_CART mutation: ', payload)
        state.shoppingCart = payload
    },
    ADD_TO_SHOPPING_CART(state, payload) {
        console.log('ADD_TO_SHOPPING_CART mutation: ', payload)
        state.shoppingCart.push(payload)
    },
    REMOVE_FROM_SHOPPING_CART(state, payload) {
        console.log('REMOVE_FROM_SHOPPING_CART: ', payload)
        const { removedSeatId } = payload
        const index = state.shoppingCart.findIndex(seat => seat.id === removedSeatId)
        console.log('index: ', index)
        // if (index !== -1) {
            state.shoppingCart.splice(index, 1)
        // }
    }
}

// actions
export const actions = {
}