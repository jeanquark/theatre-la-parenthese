<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- <nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Représentations</li>
		    	<li class="breadcrumb-item active" aria-current="page">Editer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances"><font-awesome-icon icon="calendar-day" />&nbsp;Représentations</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/performances" class="navigation">
				<font-awesome-icon icon="calendar-day" />
				<span>Représentations</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Editer représentation</h2>
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {

	}
</script>

<style scoped>

</style>