import store from '~/store'

export default async (to, from, next) => {
	console.log('Call to auth middleware')
  	if (!store.getters['auth/check']) {
    	next({ name: 'login' })
  	} else {
	    next()
  	}
}
