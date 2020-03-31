<?php

use Illuminate\Database\Seeder;

class MemberShowTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Member::class, 15)->create();

        // factory(App\Member::class, 15)->create()->each(function ($member) {
        //     $member->shows()->save(factory(App\Show::class)->make());
        // });


        // Populate roles
        factory(App\Role::class, 20)->create();

        // Populate users
        factory(App\User::class, 50)->create();

        // Get all the roles attaching up to 3 random roles to each user
        $roles = App\Role::all();

        // Populate the pivot table
        App\User::all()->each(function ($user) use ($roles) { 
            $user->roles()->attach(
                $roles->random(rand(1, 3))->pluck('id')->toArray()
            ); 
        });
    }
}
