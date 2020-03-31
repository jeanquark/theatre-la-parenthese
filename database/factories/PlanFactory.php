<?php

use App\Plan;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Plan::class, function (Faker $faker) {

	static $index = 1;

    $newPlan = [
    	'svg_id' => "plan_{$index}",
	    'name' => "Table Plan {$index}",
	    'slug' => "table-plan-{$index}"
	];

	$index++;

	return $newPlan;

	// return [
	//     'svg_id' => 'tables_plan1',
	//     'name' => 'Table Plan 1',
	//     'slug' => 'table-plan1'
	// ];
});
