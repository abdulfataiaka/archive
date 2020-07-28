<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatesTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('states')->insert([
            [
                'id' => 1,
                'country_id' => 1,
                'code' => 'LOS',
                'name' => 'Lagos'
            ]
        ]);
    }
}
