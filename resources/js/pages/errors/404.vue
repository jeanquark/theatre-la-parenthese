<template>
    <b-container>
        <b-card class="text-center">
            <h3 class="mb-4">
                Page non trouvée
            </h3>

            <div class="links">
                <router-link :to="{ name: 'accueil' }">
                    Retour à l'accueil
                </router-link>
            </div>
        </b-card>
    </b-container>
</template>

<script>
export default {
	name: 'NotFound',
	layout: 'frontend'
}
</script>
