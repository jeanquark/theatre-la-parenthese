import store from '~/store'

export default (to, from, next) => {
	console.log('Call to [admin] middleware')
	// next({ name: 'accueil'} )
	// console.log('store.getters[auth/user][roles]: ', store.getters['auth/user']['roles'])
  	if (!store.getters['auth/user'] || !store.getters['auth/user']['roles']) {
	    next({ name: 'accueil' })
  	} else if (!store.getters['auth/user']['roles'].includes('admin')) {
	    next({ name: 'accueil' })
  	} else {
	    next()
  	}
}
