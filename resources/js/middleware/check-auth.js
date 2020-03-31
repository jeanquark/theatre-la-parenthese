import store from '~/store'

export default async (to, from, next) => {
	console.log('Call to [check-auth] middleware')
  	if (!store.getters['auth/check'] && store.getters['auth/token']) {
    	try {
      		const user = await store.dispatch('auth/fetchUser')
      		// console.log('user from middleware: ', user)
      		// if (user) {
      		// await store.dispatch('shoppingCart/fetchShoppingCart')
      		// }
    	} catch (error) {
			console.log('error: ', error)
		}
  	}

  	next()
}
