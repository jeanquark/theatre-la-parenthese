<template>
	<div>
		<h1 class="text-center my-3">Mes réservations</h1>
        <div class="dropdown">
            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-light">Light</button>
        <br /><br />
        userSeats: {{ userSeats}}<br />
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Table</th>
                    <th scope="col">User</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="seat in userSeats" :key="seat.id">
                    <th scope="row">1</th>
                    <td>{{ seat.table_id }}</td>
                    <td>{{ seat.user_id }}</td>
                    <td>{{ seat.status }}</td>
                </tr>
            </tbody>
        </table>
	</div>
</template>

<script>
	export default {
		metaInfo () {
    		return { title: 'Mes réservations' }
        },
        middleware: ['auth'],
        layout: 'frontend',
        async created () {
            if (this.userSeats.length < 1) {
                await this.$store.dispatch('planSeats/fetchUserSeats', { userId: this.loadedUser.id })
            }
        },
        computed: {
            loadedUser () {
                return this.$store.getters['auth/user']
            },
            userSeats () {
                return this.$store.getters['planSeats/userSeats']
            }
        },
		methods: {
			clickOnTablePlan(event) {
      			console.log('clickOnTablePlan: ', event)
      			const elementId = event.target.id
      			console.log('elementId: ', elementId)
      			if (elementId) {
        			this.selectedTable = elementId
        			this.showModal = true
      			} else {
      				this.selectedTable = null
      			}
    		}
		}
	}
</script>

<style scoped>
</style>