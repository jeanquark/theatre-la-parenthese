<template>
	<div style="">
		<sidebar-menu :menu="menu" :collapsed="collapsed" :relative="false" @toggle-collapse="onToggleCollapse" @item-click="onItemClick">
			<span slot="toggle-icon"><font-awesome-icon icon="arrows-alt-h" /></span>
			<span slot="dropdown-icon"><font-awesome-icon icon="angle-down" /></span>
		</sidebar-menu>
		<div class="mt-2" :class="[collapsed ? 'collapsed' : 'extended']" style="border: 0px solid orange;">
			<!-- <b-alert variant="danger" show style="margin: 20px;" v-if="!loadedUser">Votre session a expiré. Sauver vos modifications et veuillez vous reconnecter en cliquant <router-link to="/login?redirect=/admin/users">ici</router-link>.</b-alert> -->
			<!-- <b-alert variant="danger" show style="margin: 20px;" v-if="!loadedUser">Votre session a expiré. Sauver vos modifications et veuillez vous reconnecter en cliquant <router-link :to="`/login?redirect=${$router.currentRoute.path}`">login</router-link>.</b-alert> -->
			<!-- loadedUser: {{ loadedUser }}<br /><br /> -->
			<b-alert variant="danger" show style="margin: 20px;" v-if="!loadedUser">Votre session a expiré. Sauver vos modifications et veuillez vous reconnecter en cliquant <span class="link" @click="redirectToLogin">ici</span>.</b-alert>
			<child />
		</div>
	</div>
</template>

<script>
	import { SidebarMenu } from 'vue-sidebar-menu'
	// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

	export default {
		name: 'BackendLayout',
		// middleware: 'admin',
		components: { SidebarMenu },
		// beforeCreate () {
		// 	console.log('beforeCreate')
  //       	document.body.className = 'home'
  //   	},
  //   	beforeDestroy () {
  //   		console.log('beforeDestroy')
  //   		document.body.className = ''
		// },
		created () {
		},
		mounted () {
		},
		data () {
			return {
				collapsed: false,
				menu: [
					{
						header: true,
						title: 'TLP Admin',
						hiddenOnCollapse: true
					},
					{
						href: '/admin/dashboard',
						title: 'Admin',
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'tachometer-alt',
								size: 'xs'
							}
						}
					},
					{
						href: '/admin/pages',
						title: 'Gestion des pages',
						alias: ['/admin/pages', '/admin/pages/create', '/admin/pages/:id', '/admin/pages/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'file-alt'
							}
						}
					},
					{
						href: '/admin/users',
						title: 'Utilisateurs',
						alias: ['/admin/users', '/admin/users/create', '/admin/users/:id', '/admin/users/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'users',
								size: 'xs'
							}
						}
					},
					{
						href: '/admin/members',
						title: 'Membres de la troupe',
						alias: ['/admin/members', '/admin/members/create', '/admin/members/:id', '/admin/members/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'id-card-alt',
								size: '6x'
							}
						}
					},
					{
						href: '/admin/shows',
						title: 'Spectacles',
						alias: ['/admin/shows', '/admin/shows/create', '/admin/shows/:id', '/admin/shows/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'theater-masks'
							}
						}
					},
					{
						href: '/admin/performances',
						title: 'Représentations',
						alias: ['/admin/performances', '/admin/performances/create', 'admin/performances/:id', '/admin/performances/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'calendar-day'
							}
						}
					},
					{
						href: '/admin/plans',
						title: 'Plans de salle',
						alias: ['/admin/plans', '/admin/plans/create', '/admin/plans/:id', '/admin/plans/:id/edit'],
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'chair'
							}
						}
					},
					// {
					// 	href: '',
					// 	title: 'Gestion des salles',
					// 	icon: {
					// 		element: 'font-awesome-icon',
					// 		attributes: {
					// 			icon: 'briefcase'
					// 		}
					// 	},
					// 	child: [
     //                        {
     //                            href: '/charts/sublink',
     //                            title: 'Tables',
     //                            icon: {
					// 				element: 'font-awesome-icon',
					// 				attributes: {
					// 					icon: 'circle'
					// 				}
					// 			},
     //                        },
     //                        {
     //                            href: '/charts/sublink',
     //                            title: 'Sièges',
     //                            icon: {
					// 				element: 'font-awesome-icon',
					// 				attributes: {
					// 					icon: 'chair'
					// 				}
					// 			},
     //                        }
     //                    ]
					// },
					{
						href: '/accueil',
						title: 'Retour au site',
						icon: {
							element: 'font-awesome-icon',
								attributes: {
								icon: 'home',
								size: 'xs'
							}
						}
					},
					{
						title: 'Logout',
						icon: {
							element: 'font-awesome-icon',
							attributes: {
								icon: 'sign-out-alt',
								size: 'xs'
							}
						}
					}
				]
			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['auth/user']
			},
		},
		methods: {
			redirectToLogin () {
				console.log(this.$router.currentRoute.path)
				const currentRoute = this.$router.currentRoute.path
				this.$router.push(`/login?redirect=${currentRoute}`)
			},
			onToggleCollapse (collapsed) {
				console.log('onToggleCollapse')
				console.log(collapsed)
				this.collapsed = collapsed
			},
			async onItemClick (event, item) {
				console.log('onItemClick: ', event, item)
				if (item.title === 'Logout') {
					// await this.$store.dispatch('auth/logout')
					// this.$router.push('/login')
					this.logout()
				}
			},
			async logout () {
				await this.$store.dispatch('auth/logout')
				// this.$store.dispatch('auth/logout')
				this.$router.push('/login')
			}
		},
		watch: {
			loadingUser () {
				console.log('[watch]: loadingUser has changed!')
			}
		}
	}
</script>

<style>

</style>

<style scoped>
	.collapsed {
		margin-left: 50px;
	}
	.extended {
		margin-left: 350px;
	}
</style>
<style lang="scss" scoped>
    @import './resources/sass/_variables.scss';
	.link {
		color: $primary;
	}
	.link:hover {
		cursor: pointer;
	}
</style>