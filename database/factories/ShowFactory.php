<?php

use App\Show;
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

$factory->define(Show::class, function (Faker $faker) {
	$shows = array(
		array (
			'name'       	=> 'Le dîner de cons',
			'slug'       	=> 'le-dîner-de-cons',
			'start_date' 	=> $faker->dateTimeBetween($startDate = '-20 months', $endDate = '-20 months'),
			'end_date'      => $faker->dateTimeBetween($startDate = '-16 months', $endDate = '-16 months'),
			'season'		=> 2018,
			'is_active'		=> false
		),
		array (
			'name'       	=> 'Les femmes savantes',
			'slug'       	=> 'les-femmes-savantes',
			'start_date' 	=> $faker->dateTimeBetween($startDate = '-8 months', $endDate = '-8 months'),
			'end_date'      => $faker->dateTimeBetween($startDate = '-4 months', $endDate = '-4 months'),
			'season'		=> 2019,
			'is_active'		=> false
		),
		array (
			'name'       	=> 'Phèdre',
			'slug'       	=> 'phedre',
			'start_date' 	=> $faker->dateTimeBetween($startDate = '+4 months', $endDate = '+4 months'),
			'end_date'      => $faker->dateTimeBetween($startDate = '+8 months', $endDate = '+8 months'),
			'season'		=> 2020,
			'is_active'		=> true
		)
	);

	static $index = 0;

    $newShow = [
        'name' => $shows[$index]['name'],
        'slug' => $shows[$index]['slug'],
        'start_date' => $shows[$index]['start_date'],
        'end_date' => $shows[$index]['end_date'],
		'season' => $shows[$index]['season'],
		'is_active' => $shows[$index]['is_active']
	];

	$index++;
	
	return $newShow;

	// return [
    //     'name' => $faker->catchPhrase,
    //     'slug' => $faker->slug,
    //     'start_date' => $faker->dateTimeBetween($startDate = '+5 months', $endDate = '+5 months'),
    //     'end_date' => $faker->dateTimeBetween($startDate = '+7 months', $endDate = '+7 months'),
    //     'season' => $faker->biasedNumberBetween($min = 2020, $max = 2024)
	// ];
});
