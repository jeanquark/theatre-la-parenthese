<?php

use Illuminate\Database\Seeder;
use App\Table;

class TablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tables = [
            [
                'svg_id' => 'table_round_4_seats',
                'name' => 'Table ronde 4 places',
                'image' => 'model_table_round_4_seats.svg',
                'svg_type' => 'circle',
                'svg_model' => 'table_round_4_seats',
                'total_seats' => 4,
                'r' => 14.302645,
                'cx' => 33.675961,
                'cy' => 53.250175,
                'd' => NULL,

            ],
            [
                'svg_id' => 'table_round_6_seats',
                'name' => 'Table ronde 6 places',
                'image' => 'model_table_round_6_seats.svg',
                'svg_type' => 'circle',
                'svg_model' => 'table_round_6_seats',
                'total_seats' => 6,
                'r' => 20.207951,
                'cx' => 97.018845,
                'cy' => 55.655598,
                'd' => NULL,

            ],
            [
                'svg_id' => 'table_round_8_seats',
                'name' => 'Table ronde 8 places',
                'image' => 'model_table_round_8_seats.svg',
                'svg_type' => 'circle',
                'svg_model' => 'table_round_8_seats',
                'total_seats' => 8,
                'r' => 23.226217,
                'cx' => 34.477772,
                'cy' => 104.565910,
                'd' => NULL,

            ],
            // [
            //     'svg_id' => 'table_long_6_seats',
            //     'name' => 'Table longue 6 places',
            //     'image' => 'model_table_long_6_seats.svg',
            //     'svg_type' => 'path',
            //     'svg_model' => 'table_long_6_seats',
            //     'total_seats' => 6,
            //     'r' => NULL,
            //     'cx' => NULL,
            //     'cy' => NULL,
            //     'd' => 'M 98.622485,89.46142 A 14.302645,14.302645 0 0 0 84.344804,103.2673 l -0.137975,-0.005 -0.0047,14.41928 h 0.128157 a 14.302645,14.302645 0 0 0 14.292151,14.01568 14.302645,14.302645 0 0 0 14.289043,-14.03377 h 0.13488 l -0.006,-13.45913 -0.13746,-0.005 a 14.302645,14.302645 0 0 0 0.0217,-0.43615 14.302645,14.302645 0 0 0 -14.302483,-14.30249 z',

            // ]
        ];

        foreach ($tables as $table) {
            Table::create($table);
        }
    }
}
