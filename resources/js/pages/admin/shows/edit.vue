<template>
	<!-- <div class="container"> -->
	<b-container>
		<!-- nav aria-label="breadcrumb">
		  	<ol class="breadcrumb">
		    	<li class="breadcrumb-item active" aria-current="page"><font-awesome-icon icon="chair" />&nbsp;Spectacles</li>
		    	<li class="breadcrumb-item active" aria-current="page">Editer</li>
		  	</ol>
		</nav> -->
		<!-- <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows"><font-awesome-icon icon="theater-masks" />&nbsp;Spectacles</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb> -->
        <b-breadcrumb>
            <b-breadcrumb-item to="/admin/shows" class="navigation">
				<font-awesome-icon icon="theater-masks" />
				<span>Spectacles</span>
			</b-breadcrumb-item>
            <b-breadcrumb-item active>Editer</b-breadcrumb-item>
        </b-breadcrumb>
		<h2 class="text-center">Editer spectacle</h2>
	<!-- </div> -->
	</b-container>
</template>

<script>
	export default {

	}
</script>

<style scoped>

</style>