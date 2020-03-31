import Vue from 'vue'
import Echo from 'laravel-echo'
import axios from 'axios'
import Noty from 'noty'
import store from '~/store'
import jwt_decode from 'jwt-decode'

window.Pusher = require('pusher-js')

// window.Echo = new Echo({
//     broadcaster: 'pusher',
// 	key: process.env.MIX_PUSHER_APP_KEY,
// 	cluster: process.env.MIX_PUSHER_APP_CLUSTER,
// 	// encrypted: true,
// 	wsHost: window.location.hostname,
// 	wsPort: 6001,
// 	encrypted: false,
// 	// disableStats: true,
// 	// enabledTransports: ['ws', 'wss']
// });


// VueEcho package
// import VueEcho from 'vue-echo'
// console.log('process.env.MIX_ACTIVATE_WEBSOCKETS: ', process.env.MIX_ACTIVATE_WEBSOCKETS)
// if (process.env.MIX_ACTIVATE_WEBSOCKETS == 'true') {
// 	Vue.use(VueEcho, {
// 		broadcaster: 'pusher',
// 		key: process.env.MIX_PUSHER_APP_KEY,
// 		cluster: process.env.MIX_PUSHER_APP_CLUSTER,
// 		// encrypted: true,
// 		wsHost: window.location.hostname,
// 		wsPort: 6001,
// 		encrypted: false,
// 	});
// }


import VueEcho from 'vue-echo'
Vue.use(VueEcho, {
	broadcaster: 'pusher',
	key: '3729cc9a955256058e8e',
	cluster: 'eu',
	encrypted: false,
	disableStats: true
})


// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '3729cc9a955256058e8e',
//     cluster: 'eu',
// 	encrypted: false
// });

function errorResponseHandler(error) {
    // check for errorHandle config
    if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
        return Promise.reject(error)
    }

    // if has response show the error 
    if (error.response) {
        console.log('error.response from bootstrap.js: ', error.response)
        console.log('error.response.status from bootstrap.js: ', error.response.status)
        // console.log('store.getters[auth/token]: ', store.getters['auth/token'])
        

        // If token has expired, logout
        if (error.response.status === 401 || error.response.status === 403) {
            const token = store.getters['auth/token']
            console.log('token: ', token)
            // const decoded = jwt_decode(token)
            // console.log('decoded: ', decoded)
            const { exp } = jwt_decode(token)
            console.log('exp: ', exp)
            if (Date.now() >= exp * 1000) {
                // store.dispatch('auth/logout')
                // store.commit('auth/SET_USER', null)
                store.commit('auth/SET_LOGOUT')
                new Noty({
                    text: "Votre session a expiré. Veuillez vous reconnecter.",
                    type: 'error',
                    timeout: 5000
                }).show()
            } else {
                new Noty({
                    text: "Vous ne disposez pas des autorisations nécessaire pour effectuer cette requête.",
                    type: 'error',
                    timeout: 5000
                }).show()
            }
        } else if (error.response.status >= 500) {
            new Noty({
                text: "Une erreur est survenue au niveau de la requête API. Veuillez contacter le webmaster si le problème persiste.",
                type: 'error',
                timeout: 5000
            }).show()
        }
        // alert(error.response.data.message)
        // return error.response
        return Promise.reject(error)
    }
}

// apply interceptor on response
axios.interceptors.response.use(
   response => response,
   errorResponseHandler
);

export default errorResponseHandler