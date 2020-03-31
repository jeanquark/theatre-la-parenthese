<?php

use App\PlanTable;
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

$factory->define(PlanTable::class, function (Faker $faker) {
	$tables = array(
		array (
			'table_number'	=> '01',
			'svg_id'       	=> 'ks0g0po7a',
			'svg_type'      => 'circle',
			'svg_model' 	=> 'table_round_4_seats',
			'r'     		=> '7.1513225',
			'cx'			=> '102.15772737670899',
			'cy'			=> '53.62439455200195',
			'd'				=> '',
			'total_seats'	=>  4
		),
		array (
			'table_number'	=> '02',
			'svg_id'       	=> '1wvykq6ur',
			'svg_type'      => 'circle',
			'svg_model' 	=> 'table_round_6_seats',
			'r'     		=> '10.1039755',
			'cx'			=> '188.32786771191405',
			'cy'			=> '97.19371243847657',
			'd'				=> '',
			'total_seats'	=>  6
		),
		// array (
		// 	'svg_id'       	=> '1lg9ozmqv',
		// 	'svg_type'      => 'circle',
		// 	'svg_model' 	=> 'table_round_8_seats',
		// 	'r'     		=> '',
		// 	'cx'			=> '',
		// 	'cy'			=> '',
		// 	'd'				=> '',
		// 	'total_seats'	=>  8
		// ),
		// array (
		// 	'svg_id'       	=> '1lg9ozmqv',
		// 	'svg_type'      => 'path',
		// 	'svg_model' 	=> 'table_long_6_seats',
		// 	'r'     		=> '',
		// 	'cx'			=> '',
		// 	'cy'			=> '',
		// 	'd'				=> '',
		// 	'total_seats'	=>  6
		// )
	);

	static $index = 0;

    $newTable = [
    	'table_number' => $tables[$index]['table_number'],
        // 'svg_id' => $tables[$index]['svg_id'] . '_table0' . ($index + 1),
        'svg_id' => $tables[$index]['svg_id'],
        'svg_type' => $tables[$index]['svg_type'],
        'svg_model' => $tables[$index]['svg_model'],
        'r' => $tables[$index]['r'],
		'cx' => $tables[$index]['cx'],
		'cy' => $tables[$index]['cy'],
		'd' => $tables[$index]['d'],
		'total_seats' => $tables[$index]['total_seats']
	];

	if ($index >= 1) {
		$index = 0;
	} else {
		$index++;
	}

	
	return $newTable;
});
