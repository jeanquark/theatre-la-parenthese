<template>
    <b-container>
        <b-row class="justify-content-center">
            <ul class="snip1189">
                <li :class="this.$route.path === '/accueil' ? 'current' : ''">
                    <span class="logo" style="letter-spacing: 10px; font-size: 1.3em">
                        <router-link to="/accueil">
                            <span style="color: black">LA</span>
                            <span style="color: var(--primary);">
                                PA
                                <!-- <span style="letter-spacing: 0">
                                    A
                                </span> --> </span
                            ><br />
                            <span style="color: var(--primary);">
                                RENT
                                <!-- <span style="letter-spacing: 0">
                                    T
                                </span> --> </span
                            ><br />
                            <span style="color: var(--primary);">
                                HESE
                                <!--  <span style="letter-spacing: 0">
                                    E
                                </span> -->
                            </span>
                        </router-link>
                    </span>
                </li>
                <li :class="this.$route.path === '/qui-sommes-nous' ? 'current' : ''">
                    <router-link to="/qui-sommes-nous"
                        ><br />
                        QUI SOMMES-NOUS ?<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Histoire et membres </span><br /><br />
                    </router-link>
                </li>
                <!-- <li :class="this.$route.path === '/spectacles' ? 'current' : ''">
                    <router-link to="/spectacles">
                        <span class="yellowgreen"
                            ><br />
                            SPECTACLES<br />
                            <span style="font-weight: 300; font-size: 12px; color: var(--primary);">
                                A venir et archives
                            </span> </span
                        ><br /><br />
                    </router-link>
                </li> -->
                <li :class="this.$route.path.startsWith('/mes-reservations') ? 'current' : ''" v-if="authUser && authUser.plan_seats">
                    <router-link to="/mes-reservations"
                        ><br />
                        MES RESERVATIONS<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Réservez vos places </span><br /><br />
                    </router-link>
                </li>
                <li :class="this.$route.path.startsWith('/reservations') ? 'current' : ''" v-else>
                    <router-link to="/reservations"
                        ><br />
                        RESERVATIONS<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Réservez vos places </span><br /><br />
                    </router-link>
                </li>
                <li :class="this.$route.path.startsWith('/login') || this.$route.path.startsWith('/enregistrement') ? 'current' : ''" v-if="!authUser">
                    <router-link to="/login" v-if="this.$route.name === 'register'"
                        ><br />
                        S'ENREGISTRER<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Login </span><br /><br />
                    </router-link>
                    <router-link to="/login" v-else
                        ><br />
                        LOGIN<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> S'enregistrer </span><br /><br />
                    </router-link>
                </li>
                <li :class="this.$route.path.startsWith('/mon-panier') ? 'current' : ''">
                    <router-link to="/mon-panier"
                        ><br />
                        Mon panier<br />
                        <font-awesome-icon icon="shopping-cart" size="1x" :style="{ color: 'var(--primary)' }" />
                        <b-badge variant="dark">{{ loadedShoppingCart.length }}</b-badge
                        ><br /><br />
                    </router-link>
                </li>

                <li v-if="authUser && authUser.roles && authUser.roles.includes('admin')">
                    <router-link to="/admin/dashboard"
                        ><br />
                        ADMIN<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Gérer le site </span><br /><br />
                    </router-link>
                </li>
                <li @click="logout" v-if="authUser">
                    <router-link to=""
                        ><span class="greetings">{{ authUser.firstname }}&nbsp;{{ authUser.lastname }}</span><br />
                        LOGOUT<br />
                        <span style="font-weight: 300; font-size: 12px; color: var(--primary);"> Fermer la session </span><br /><br />
                    </router-link>
                </li>
            </ul>
        </b-row>
    </b-container>
</template>

<script>
export default {
    mounted() {},
    data() {
        return {
            currentRoute: this.$route.path
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['auth/user']
        },
        loadedShoppingCart() {
            return this.$store.getters['shoppingCart/shoppingCart']
        }
    },
    methods: {
        async logout() {
            console.log('logout')
            this.$store.dispatch('auth/logout')
            // console.log('abc: ', abc)
        }
    }
}
</script>

<style scoped>
/*.router-link-exact-active {
        background-color: red;
        color: black;
    }
    .router-link-exact-active span:before,
    .router-link-exact-active span:after {
        -webkit-transform: translate(0%, 0%);
        transform: translate(0%, 0%);
        opacity: 1;
    }*/

.snip1189 {
    font-family: 'Raleway', Arial, sans-serif;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    height: 100px;
}
.snip1189 * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
}
.snip1189 li {
    display: inline-block;
    list-style: outside none none;
    margin: 1em 0.3em;
    padding: 0;
    font-weight: bold;
    height: 100px;
    color: black;
}
.snip1189 a {
    padding: 0.5em 0.5em;
    margin: 0.2em 0;
    display: block;
    color: yellowgreen;
    position: relative;
    text-decoration: none;
}
.snip1189 a:before,
.snip1189 a:after {
    height: 113px;
    width: 10px;
    position: absolute;
    content: '';
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    opacity: 0;
    color: black;
}
.snip1189 a:before {
    left: 0;
    top: 0;
    border-left: 5px solid black;
    border-top: 5px solid black;
    border-bottom: 5px solid black;
    -webkit-transform: translate(100%, 50%);
    transform: translate(100%, 50%);
}
.snip1189 a:after {
    right: 0;
    bottom: 0;
    border-right: 5px solid black;
    border-bottom: 5px solid black;
    border-top: 5px solid black;
    -webkit-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
}
.snip1189 a:hover,
.snip1189 .current a,
.snip1189 .nocurrent a {
    color: black;
}
.snip1189 a:hover:before,
.snip1189 .current a:before,
.snip1189 a:hover:after,
.snip1189 .current a:after {
    -webkit-transform: translate(0%, 0%);
    transform: translate(0%, 0%);
    opacity: 1;
}
</style>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.button {
    background-color: #fff;
    color: $primary;
    border: 1px solid $primary;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    &:hover {
        background-color: $primary;
        color: #fff;
    }
}
.greetings {
    font-size: .8em;
    color: $secondary;
    text-transform: capitalize;
}
</style>
