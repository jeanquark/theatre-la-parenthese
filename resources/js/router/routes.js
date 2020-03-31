function page (path) {
    return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
    { path: '/', name: 'index', component: page('index.vue') },
    { path: '/welcome', name: 'welcome', component: page('welcome.vue') },

    { path: '/login', name: 'login', component: page('auth/login.vue') },
    { path: '/enregistrement', name: 'register', component: page('auth/register.vue') },
    { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
    { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
    { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
    { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

    { path: '/home', name: 'home', component: page('home.vue') },
    { path: '/settings',
        component: page('settings/index.vue'),
        children: [
            { path: '', redirect: { name: 'settings.profile' } },
            { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
            { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
        ] },

    // { path: '/admin', name: 'admin', component: page('admin.vue') },
    { path: '/accueil', name: 'accueil', component: page('accueil') },
    { path: '/qui-sommes-nous', name: 'qui_sommes_nous', component: page('qui-sommes-nous.vue') },
    { path: '/spectacles', name: 'spectacles', component: page('spectacles.vue') },
	// { path: '/reservation', name: 'reservation', component: page('reservation.vue') },
	{ path: '/reservations', name: 'reservations', component: page('reservations/index.vue') },
	{ path: '/reservations/:id', name: '', component: page('reservations/_id/index.vue') },
    { path: '/contact', name: 'contact', component: page('contact.vue') },
    { path: '/mes-reservations', name: 'mes_reservations', component: page('mes-reservations.vue') },
    { path: '/mon-panier', name: 'mon_panier', component: page('mon-panier.vue') },

    { path: '/admin', component: page('admin/index.vue'),  children: [
        { path: '/admin/dashboard', name: '', component: page('admin/dashboard.vue') },

        { path: '/admin/pages', name: '', component: page('admin/pages/index.vue') },
        { path: '/admin/pages/create', name: '', component: page('admin/pages/create.vue') },
        { path: '/admin/pages/:id', name: '', component: page('admin/pages/show.vue') },
        { path: '/admin/pages/:id/edit', name: '', component: page('admin/pages/edit.vue') },

        { path: '/admin/users', name: '', component: page('admin/users/index.vue') },
        { path: '/admin/users/create', name: '', component: page('admin/users/create.vue') },
        { path: '/admin/users/:id', name: '', component: page('admin/users/show.vue') },
        { path: '/admin/users/:id/edit', name: '', component: page('admin/users/edit.vue') },

        { path: '/admin/members', name: '', component: page('admin/members/index.vue') },
        { path: '/admin/members/create', name: '', component: page('admin/members/create.vue') },
        { path: '/admin/members/:id', name: '', component: page('admin/members/show.vue') },
        { path: '/admin/members/:id/edit', name: '', component: page('admin/members/edit.vue') },

        { path: '/admin/shows', name: '', component: page('admin/shows/index.vue') },
        { path: '/admin/shows/create', name: '', component: page('admin/shows/create.vue') },
        { path: '/admin/shows/:id', name: '', component: page('admin/shows/show.vue') },
        { path: '/admin/shows/:id/edit', name: '', component: page('admin/shows/edit.vue') },

        { path: '/admin/performances', name: '', component: page('admin/performances/index.vue') },
        { path: '/admin/performances/create', name: '', component: page('admin/performances/create.vue') },
        { path: '/admin/performances/:id', name: '', component: page('admin/performances/show.vue') },
        { path: '/admin/performances/:id/edit', name: '', component: page('admin/performances/edit.vue') },

        { path: '/admin/plans', name: '', component: page('admin/plans/index.vue') },
        { path: '/admin/plans/create', name: '', component: page('admin/plans/create.vue') },
        { path: '/admin/plans/:id', name: '', component: page('admin/plans/show.vue') },
        { path: '/admin/plans/:id/edit', name: '', component: page('admin/plans/edit.vue') },

        // { path: '', redirect: '/admin/dashboard' },

    ]},

    { path: '*', component: page('errors/404.vue') }
]
