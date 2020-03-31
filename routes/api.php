<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Pages Routes
Route::get('/pages', 'PagesController@getPages');
Route::get('/pages/{slug}', 'PagesController@getPageBySlug');

// Plans Routes
Route::get('/plans', 'PlansController@getAll');
Route::get('/plans/{id}', 'PlansController@getPlan');

// Tables Routes


// Tables Plan Routes
// Route::get('/plan-tables', 'TablePlanController@index');
// Route::get('/plan-tables', 'TablePlanController@getPlanTables');
// Route::get('/plan-tables/{svgId}', 'TablePlanController@getTableBySvgId');
// Route::put('/plan-tables', 'TablePlanController@update');
// Route::delete('/plan-tables/{svgId}', 'TablePlanController@delete');

// Route::post('/tables', 'TablePlanController@addTable');
// Route::post('/update-table-plan2', 'TablePlanController@update2');

// Seats Plan Routes
Route::get('/plan-seats', 'SeatPlanController@getSeats');
Route::get('/plan-seats/delete-reservations', 'SeatPlanController@deleteReservations');
Route::get('/plan-seats/{planId}', 'SeatPlanController@getSeatsByPlanId');
Route::get('/plan-seats/users/{userId}', 'SeatPlanController@getUserSeats');
Route::post('/plan-seats/reserve-a-seat', 'SeatPlanController@reserveASeat');
Route::post('/plan-seats/delete-seat-reservation', 'SeatPlanController@deleteSeatReservation');

// Route::get('plan-seats-by-table/{userId}', 'SeatPlanController@getUserSeats');

Route::get('/plan-tables/{svgId}', 'TablePlansController@getPlanTableBySvgId');

// Seat Reservation Routes
// Route::post('/reserve-a-seat', 'SeatReservationController@reserveOneSeat');

Route::get('/shows', 'ShowsController@getShows');
Route::get('/shows/{id}', 'ShowsController@getShow');
Route::get('/performances', 'PerformancesController@getPerformances');
Route::get('/performances/{id}', 'PerformancesController@getPerformanceById');
Route::get('/performances/shows/{showId}', 'PerformancesController@getPerformancesByShow');
// Route::put('/users/{id}', 'UsersController@updateUser');

// Route::get('/shopping-cart', 'ShoppingCartController@getShoppingCart');



Route::group(['middleware' => 'guest:api'], function () {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('register', 'Auth\RegisterController@register');

    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::post('email/verify/{user}', 'Auth\VerificationController@verify')->name('verification.verify');
    Route::post('email/resend', 'Auth\VerificationController@resend');

    Route::post('oauth/{driver}', 'Auth\OAuthController@redirectToProvider');
    Route::get('oauth/{driver}/callback', 'Auth\OAuthController@handleProviderCallback')->name('oauth.callback');
});


Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\LoginController@logout');

    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
    Route::get('/user', 'Settings\ProfileController@getAuthUser');

    Route::patch('/settings/profile', 'Settings\ProfileController@update');
    Route::patch('/settings/password', 'Settings\PasswordController@update');

    // Route::post('/plan-seats/reserve-a-seat', 'SeatPlanController@update');

    Route::post('/plan-seats/confirm-seat-reservation', 'SeatPlanController@confirmSeatReservation');
});

Route::group(['middleware' => 'role:admin'], function () {
    // Users
    Route::get('/users', 'UsersController@getUsers');
    Route::post('/users', 'UsersController@addUser');
    Route::get('/users/{id}', 'UsersController@getUser');
    Route::put('/users/{id}', 'UsersController@update');
    Route::delete('/users/{id}', 'UsersController@delete');

    // Members
    Route::get('/members', 'MembersController@getMembers');
    Route::post('/members', 'MembersController@createMember');
    Route::get('/members/{id}', 'MembersController@getMember');
    Route::put('/members/{id}', 'MembersController@updateMember');
    Route::delete('/members/{id}', 'MembersController@deleteMember');

    // Shows
    Route::post('/shows', 'ShowsController@createShow');
    Route::put('/shows/{id}', 'ShowsController@updateShow');
    Route::delete('/shows/{id}', 'ShowsController@deleteShow');

    // Performances
    Route::post('/performances', 'PerformancesController@createPerformance');
    Route::put('/performances/{id}', 'PerformancesController@updatePerformance');
    Route::delete('/performances/{id}', 'PerformancesController@deletePerformance');

    // Plans
    Route::post('/plans', 'PlansController@create');
    Route::put('/plans/{id}', 'PlansController@update');
    Route::delete('/plans/{id}', 'PlansController@delete');
    // Route::post('/plans/svg', 'PlansController@getSvg');

    // Tables
    Route::get('/tables', 'TablesController@getTables');
    Route::get('/tables/{id}', 'TablesController@getTableById');

    // Tables Plan Routes
    Route::get('/plan-tables', 'TablePlansController@getPlanTables');
    Route::post('/plan-tables', 'TablePlansController@create');
    Route::get('/plan-tables/planId/{planId}', 'TablePlansController@getPlanTablesByPlanId');
    // Route::put('/plan-tables', 'TablePlansController@update');
    Route::delete('/plan-tables/{svgId}', 'TablePlansController@delete');

    Route::get('/pages/images', 'PagesController@getImages');
    Route::post('/pages', 'PagesController@create');
    Route::put('/pages/{slug}', 'PagesController@update');
    Route::delete('/pages/{id}', 'PagesController@delete');
    Route::post('/pages/upload-image', 'PagesController@uploadImage');
});

// Route::post('/send-message', 'MessagesController@sendMessage');