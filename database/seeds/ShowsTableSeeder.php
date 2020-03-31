<?php

use Illuminate\Database\Seeder;

class ShowsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		// Populate shows table attaching up to 8 performances to each show
		
        // factory(App\Show::class, 3)->create()->each(function($show) {
        //     $show->performances()->saveMany(
        //         factory(App\Performance::class, rand(1, 8))->make(['show_id' => NULL])
        //     );
		// });
		
		// // Populate plans table attaching a total of 4 tables to each plan
		// $performances = App\Performance::all();
		// foreach ($performances as $performance) {
		// 	factory(App\Plan::class, 1)->create()->each(function($plan) {
		// 		$plan->plan_tables()->saveMany(
		// 			factory(App\PlanTable::class, 4)->make(['plan_id' => NULL])
		// 		);
		// 	});
		// }
		

		factory(App\Show::class, 3)->create()->each(function($show) {
            $show->performances()->saveMany(
                factory(App\Performance::class, rand(3, 6))->create(['show_id' => $show->id])->each(function($performance) {
					$performance->plan()->saveMany(
						factory(App\Plan::class, 1)->create(['performance_id' => $performance->id])->each(function($plan) {
							$plan->plan_tables()->saveMany(
								factory(App\PlanTable::class, 2)->create(['plan_id' => $plan->id])->each(function($planTable) {
									$planTable->seats()->saveMany(
										factory(App\PlanSeat::class, $planTable->total_seats)->make(['plan_table_id' => $planTable->id])
									);
								})
							);
						})
					);
				})
            );
		});

		
		// factory(App\Show::class, 3)->create()->each(function($show) {
        //     $show->performances()->saveMany(
        //         factory(App\Performance::class, rand(1, 8))->make(['show_id' => NULL])->each(function($performance) {
		// 			$performance->plan()->saveMany(
		// 				factory(App\Plan::class, 1)->make(['performance_id' => NULL])->each(function($plan) {
		// 					$plan->plan_tables()->saveMany(
		// 						factory(App\PlanTable::class, 4)->make(['plan_id' => NULL])
		// 					);
		// 				})
		// 			);
		// 		})
        //     );
		// });
		
		// // Populate plans table attaching a total of 4 tables to each plan
		// $performances = App\Performance::all();
		// foreach ($performances as $performance) {
		// 	factory(App\Plan::class, 1)->create()->each(function($plan) {
		// 		$plan->plan_tables()->saveMany(
		// 			factory(App\PlanTable::class, 4)->make(['plan_id' => NULL])
		// 		);
		// 	});
		// }



        // Populate members table
        factory(App\Member::class, 15)->create();

        // Populate the pivot table
        // Get all the members attaching up to 3 random shows to each member
        $shows = App\Show::all();

        App\Member::all()->each(function ($member) use ($shows) { 
            $member->shows()->attach(
                $shows->random(rand(1, 3))->pluck('id')->toArray()
            ); 
        });
    }
}
