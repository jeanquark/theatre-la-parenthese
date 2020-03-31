@php
$config = [
    'appName' => config('app.name'),
    'locale' => $locale = app()->getLocale(),
    'locales' => config('app.locales'),
    'githubAuth' => config('services.github.client_id'),
];
@endphp
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  	<title>{{ config('app.name') }}</title>

    <meta name="csrf-token" content="{{ csrf_token() }}" />
	
  	<link rel="stylesheet" href="{{ mix('dist/css/app.css') }}">

    <style>
      	html, body {
  			height: 100%;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}

    </style>
</head>
<body>
	<div id="app">
	</div>
  	{{-- Global configuration object --}}
  	<script>
    	window.config = @json($config);
  	</script>

	
  	{{-- Load the application scripts --}}
  	<script src="{{ mix('dist/js/app.js') }}"></script>

	<script>
		// Echo.channel('home').listen('NewMessage', (e) => {
		// 	console.log(e.message)
		// })
		// Echo.channel('update-seat').listen('UpdateSeat', (seat) => {
		// 	console.log('seat: ', seat)
		// })
	</script>
</body>
</html>
