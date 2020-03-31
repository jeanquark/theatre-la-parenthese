@extends('layouts.layoutFront')

@section('css')
	<style>
	</style>
@endsection

@section('content')
	<div id="app"></div>
@endsection

@section('scripts')
	{{-- // <script src="{{ asset('js/app.js') }}"></script> --}}
	{{-- // <script src="dist/js/app.js"></script> --}}

	{{-- Global configuration object --}}
  	{{-- <script>
    	window.config = @json($config);
  	</script> --}}

	{{-- // <script src="{{ mix('dist/js/app.js') }}"></script> --}}
	<script>
		// import Welcome from '../js/pages/Welcome.vue';
	</script>
@endsection