<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item active><font-awesome-icon icon="file-alt" />&nbsp;Pages</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="text-center">Gestion des pages</h2>

        <!-- pages: {{ pages }}<br /><br /> -->
        <!-- contentsArray: {{ contentsArray }}<br /><br /> -->

        <b-button to="/admin/pages/create" variant="primary" class="my-3">Créer une nouvelle page</b-button>

        <b-table responsive="sm" show-empty small stacked="md" :items="pagesArray" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" class="nowrap" v-if="!loading">

            <template v-slot:cell(is_published)="row">
                <!-- {{ row.item.is_published ? 'Oui' : 'Non' }} -->
                <span class="text-success" v-if="row.item.is_published">
                    Oui
                </span>
                <span class="text-danger" v-else>
                    Non
                </span>
            </template>

            <template v-slot:cell(updated_at)="row">
                {{ row.item.updated_at | moment('from', 'now') }}
            </template>

            <template v-slot:cell(actions)="data">
                <router-link :to="`/admin/pages/${data.item.id}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/pages/${data.item.id}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deletePage(data.item)">
                    <font-awesome-icon icon="trash" />
                </button>
                <!-- <router-link :to="`/admin/pages/${data.item.slug}`" class="btn btn-warning" style="display: inline-block;">
                    <font-awesome-icon icon="eye" />
                </router-link>
                <router-link :to="`/admin/pages/${data.item.slug}/edit`" class="btn btn-success" style="display: inline-block;">
                    <font-awesome-icon icon="edit" />
                </router-link>
                <button class="btn btn-danger" @click="deletePage(data.item.id)">
                    <font-awesome-icon icon="trash" />
                </button> -->
            </template>
        </b-table>
        <b-row class="justify-content-center" v-if="loading">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </b-row>
    </b-container>
</template>

<script>
export default {
    layout: 'backend',
    async created() {
        try {
            if (Object.keys(this.$store.getters['pages/pages']).length <= 2) {
                this.$store.commit('loading/SET_LOADING', true)
                await this.$store.dispatch('pages/fetchPages')
                this.$store.commit('loading/SET_LOADING', false)
            }
        } catch (error) {
            console.log('error: ', error)
            this.$store.commit('loading/SET_LOADING', false)
        }
    },
    data() {
        return {
            sortBy: 'id',
            sortDesc: true,
            fields: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Titre', sortable: true },
                { key: 'slug', label: 'Slug', sortable: true },
                { key: 'is_published', label: 'Publié?', sortable: true },
                { key: 'updated_at', label: 'Dernière modification', sortable: true },
                { key: 'actions', sortable: false }
            ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters['loading/loading']
        },
        pages() {
            return this.$store.getters['pages/pages']
		},
        pagesArray() {
            const array = []
            for (let key in this.pages) {
                if (this.pages.hasOwnProperty(key) && this.pages[key] != null) {
                    array.push(this.pages[key])
                }
            }
            return array
        }
    },
    methods: {
        async deletePage(page) {
            try {
                const value = await this.$bvModal.msgBoxConfirm(`Etes-vous sûr de vouloir supprimer la page ${page.name}?`, {
                    okTitle: 'OK',
                    cancelTitle: 'Annuler'
                })
                console.log('value: ', value)
                if (value) {
                    await this.$store.dispatch('pages/deletePage', { pageId: page.id })
                    this.$noty.success('Page supprimée avec succès!')
                }
            } catch (error) {
                console.log('error: ', error)
                this.$noty.error("Une erreur est survenue et la page n'a pas pu être supprimée.")
            }
        }
    }
}
</script>

<style scoped>
.table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    vertical-align: middle;
}
.inline-block {
    display: inline-block;
}
.nowrap {
    white-space: nowrap;
}
</style>
