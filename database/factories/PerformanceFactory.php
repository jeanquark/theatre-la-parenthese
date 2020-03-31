<?php

use App\Performance;
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

$factory->define(Performance::class, function (Faker $faker) {

	static $index = 1;

	$newPerformance = [
		'name' => 'Spectacle N°' . $index,
        // 'slug' => $faker->slug,
        'slug' => str_slug('Spectacle N°' . $index, '-'),
		'date' => $faker->dateTimeBetween($startDate = '- 1 month', $endDate = '+ 3 months'),
		'location' => $faker->address
	];

	$index++;

	return $newPerformance;
  //   return [
  //       'name' => 'Spectacle N° ' . $faker->randomDigit,
  //       'slug' => $faker->slug,
		// 'date' => $faker->dateTimeBetween($startDate = '- 1 month', $endDate = '+ 3 months'),
		// 'location' => $faker->address
  //   ];
});
