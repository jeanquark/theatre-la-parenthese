<?php
// composer dump-autoload
// php artisan migrate:refresh --seed

// To run websockets server for realtime propagations:
// php artisan websockets:serve

// To propagate PHP configuration changes:
// valet restart

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

// Route::patch('/admin', function () {
// 	return view('index');
// });
// Route::patch('/update-table-plan', 'TablePlanController@update2');
// Route::post('/submit', 'TablePlanController@update2');

Route::get('/cronjob' , function(){
	// if (env('ACTIVATE_WEBSOCKETS') == true) {
	// 	return 'true';
	// } else {
	// 	return 'false';
	// }
	Artisan::call('schedule:run');
	return 'Schedule function called!';
});

// Route::put('update-table-plan', 'TablePlanController@update3');

Route::get('{path}', function () {
    return view('index');
})->where('path', '(.*)');
