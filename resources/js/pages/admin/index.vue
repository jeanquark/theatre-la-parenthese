<template>
	<!-- <div class="container"> -->
	<div>
		<router-view />
	</div>
</template>

<script>
	export default {
		layout: 'backend',
		middleware: 'admin'
	}
</script>

<style scoped>
	
</style>