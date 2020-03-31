<template>
    <b-container>       
        <b-row>
            <div v-html="pages[pageSlug]['content']" v-if="pages[pageSlug]"></div>
            <!-- <router-link to="/admin/users">Admin users</router-link> -->
        </b-row>
    </b-container>
</template>

<script>
	import axios from 'axios'
    import Form from 'vform'

	export default {
        metaInfo () {
            return { title: 'Accueil' }
        },
        layout: 'frontend',
        async created () {
            if (!this.$store.getters['pages/pages'][this.pageSlug]) {
                this.$store.commit('loading/SET_LOADING', true)
                await this.$store.dispatch('pages/fetchPageBySlug', this.pageSlug)
                this.$store.commit('loading/SET_LOADING', false)
            }
        },
        mounted () {
        },
  		data () {
  			return {
                pageSlug: 'accueil',
                form: new Form({
                    message: ''
                })
  			}
		},
		computed: {
			loadedUser () {
				return this.$store.getters['auth/user']
			},
            pages () {
                return this.$store.getters['pages/pages']
            },
            page () {
                return this.pages[this.pageSlug]
            },
            check () {
                return this.$store.getters['auth/check']
            },
            token () {
                return this.$store.getters['auth/token']
            }
		},
  		methods: {
            async updateUserRole () {
                try {
					const abc = await this.$store.dispatch('users/updateUser', { user: { id: this.loadedUser.id, role: 'admin' }})
					console.log('abc: ', abc)
                    this.$noty.success('Utilisateur mis à jour avec succès!')
                } catch (error) {
                    this.$noty.error("Une erreur est survenue et l'utilisateur n'a pas pu être mis à jour.")
                }
            },
            async deleteReservations () {
                try {
                    const { data } = await axios.get('/api/plan-seats/delete-reservations')
                    console.log('data: ', data)
                    this.$noty.success("Les entrées ont bien été effacées.")
                } catch (error) {
                    console.log('error: ', error)
                    this.$noty.error("Une erreur est survenue et les entrées n'ont pas pu être effacées.")
                }
            }
  		}
	}
</script>

<style scoped>

</style>