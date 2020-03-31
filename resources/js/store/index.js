import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// Configure Vuex persist
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: state => ({
        shoppingCart: state.shoppingCart
        // planSeats: state.planSeats
    })
})

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext
    .keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }

        return { ...modules, [name]: module }
    }, {})

export default new Vuex.Store({
    modules,
    plugins: [vuexLocalStorage.plugin]
})
