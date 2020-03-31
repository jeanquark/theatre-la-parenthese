<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
// use Database\Seeds\PermissionsTableSeeder;
// use Database\Seeds\RolesTableSeeder;
// use Database\Seeds\ConnectRelationshipsSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	 Model::unguard();

            // $this->call(PermissionsTableSeeder::class);
            // $this->call(RolesTableSeeder::class);
            // $this->call(ConnectRelationshipsSeeder::class);
         
            $this->call('PermissionsTableSeeder');
            $this->call('RolesTableSeeder');
            $this->call('UsersTableSeeder');
            $this->call('ConnectRelationshipsSeeder');
            $this->call('TablesTableSeeder');
            $this->call('ShowsTableSeeder');
            $this->call('PagesTableSeeder');
            // $this->call('PerformancesTableSeeder');
            // $this->call('MembersTableSeeder');

        Model::reguard();
    }
}
