<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userRole = config('roles.models.role')::where('name', '=', 'User')->first();
        $adminRole = config('roles.models.role')::where('name', '=', 'Admin')->first();
        $permissions = config('roles.models.permission')::all();

        /*
         * Add Users
         *
         */
        if (config('roles.models.defaultUser')::where('email', '=', 'admin@example.com')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Admin',
                'lastname' => '',
                'email'    => 'admin@example.com',
                'password' => bcrypt('secret'),
            ]);

            $newUser->attachRole($adminRole);
            foreach ($permissions as $permission) {
                $newUser->attachPermission($permission);
            }
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'user@example.com')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'User',
                'lastname' => '',
                'email'    => 'user@example.com',
                'password' => bcrypt('secret'),
            ]);

            $newUser;
            $newUser->attachRole($userRole);
        }
    }
}
