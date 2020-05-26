<template>
    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances" class="navigation">
                <font-awesome-icon icon="calendar-day" />
                <span>Représentations</span>
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>

		<!-- performances: {{ performances }}<br /><br /> -->
		<!-- performance: {{ performance }}<br /><br /> -->
		<!-- form: {{ form }}<br /><br /> -->

        <h2 class="text-center">
            Editer représentation <span class="primary-color" v-if="performance">{{ performance.name }}</span>
        </h2>

        <b-form @submit.prevent="updatePerformance">
			<b-row no-gutters>
				<b-col cols="12" md="6" class="px-2">
					<b-form-group label="Nom:" label-for="name">
						<b-form-input id="name" name="name" :class="{ 'is-invalid': form.errors.has('name') }" v-model="form.name"></b-form-input>
						<has-error :form="form" field="name" />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="6" class="px-2">
					<b-form-group label="Lieu:" label-for="location">
						<b-form-input id="location" location="location" :class="{ 'is-invalid': form.errors.has('location') }" v-model="form.location"></b-form-input>
						<has-error :form="form" field="location" />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="6" class="px-2">
					<b-form-group label="Date:" label-for="date">
						<VueCtkDateTimePicker
                        label="Cliquer pour choisir une date"
                        format="YYYY-MM-DD HH:mm"
                        formatted="YYYY-MM-DD HH:mm"
                        color="#9ACD32"
                        button-color="#9ACD32"
                        button-now-translation="Aujourd'hui"
                        id="newPerformanceDate"
                        v-model="form.date"
                    />
					</b-form-group>
				</b-col>
			</b-row>

            <b-row class="justify-content-center my-2">
                <b-button type="submit" variant="primary" :disabled="loading">
                    <b-spinner small type="grow" v-if="loading"></b-spinner>
                    Editer le contenu
                </b-button>
            </b-row>
            <b-row class="justify-content-center">
                <b-alert variant="danger" dismissible :show="form.errors.any()">Erreur lors de l'envoi. Veuillez vérifier la validité des champs.</b-alert>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import Form from 'vForm'

// Vue date time picker
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
	components: {
		VueCtkDateTimePicker
	},
    async created() {
        if (!this.$store.getters['performances/performances'][this.$route.params.id]) {
            await this.$store.dispatch('performances/fetchPerformanceById', { performanceId: this.$route.params.id })
		}
		this.form.fill(this.performance)
    },
    async mounted() {},
    data() {
        return {
			form: new Form({
				id: '',
				name: '',
				location: '',
				date: ''
			})
		}
    },
    computed: {
		loading () {
			return this.$store.getters['loading/loading']
		},
		performances () {
			return this.$store.getters['performances/performances']
		},
		performance () {
			return this.performances[this.$route.params.id]
		}
	},
    methods: {
		async updatePerformance () {
			try {
                console.log('updatePerformance: ', this.form)
                this.$store.commit('loading/SET_LOADING', true)

                console.log('this.form: ', this.form)

				await this.$store.dispatch('performances/updatePerformance', this.form)
				
                this.$store.commit('loading/SET_LOADING', false)
                this.$noty.success('Page mise à jour avec succès!')
                this.$router.push('/admin/performances')
            } catch (error) {
                this.$store.commit('loading/SET_LOADING', false)
                console.log('error: ', error)
                this.$noty.error("Une erreur est survenue et la représentation n'a pas pu être mise à jour.")
            }
		}
	}
}
</script>

<style lang="scss" scoped>
@import './resources/sass/_variables.scss';
.primary-color {
    color: $primary;
}
</style>
