<?php

use App\PlanTable;
use App\PlanSeat;
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

$factory->define(PlanSeat::class, function (Faker $faker, $params) {
	$seats = array(
		array (
			'svg_id'       	=> 'seat01',
		),
		array (
			'svg_id'       	=> 'seat02',
		),
		array (
			'svg_id'       	=> 'seat03',
		),
		array (
			'svg_id'       	=> 'seat04',
		),
		array (
			'svg_id'       	=> 'seat05',
		),
		array (
			'svg_id'       	=> 'seat06',
		),
		array (
			'svg_id'       	=> 'seat07',
		),
		array (
			'svg_id'       	=> 'seat08',
		),
		array (
			'svg_id'       	=> 'seat09',
		),
		array (
			'svg_id'       	=> 'seat10',
		)
	);

	static $index = 0;
	$planTableId = $params['plan_table_id'];
	$planTable = PlanTable::where('id', '=', $planTableId)->first();
	$total_seats = intval($planTable->total_seats);
	// $total_seats = intval(4);

    $newSeat = [
        'svg_id' => 'table_' . $planTable['svg_id'] . '_' . $seats[$index]['svg_id'],
        'seat_number' => $faker->randomNumber($nbDigits = 2),
        'price' => $faker->randomNumber($nbDigits = 4)
	];

	if ($index < $total_seats - 1) {
		$index++;
	} else {
		$index = 0;
	}

	
	return $newSeat;
});
