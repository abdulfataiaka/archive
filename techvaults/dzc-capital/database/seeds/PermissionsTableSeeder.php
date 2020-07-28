<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('permissions')->insert([
            [
                'id' => 1,
                'name' => 'Save Client Profile',
                'code' => 'save_client_profile'
            ],
            [
                'id' => 2,
                'name' => 'Approve Client Profile',
                'code' => 'approve_client_profile'
            ]
        ]);
    }
}
