<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('cities')->insert([
            [
                'id' => 1,
                'state_id' => 1,
                'name' => 'Lekki'
            ],
            [
                'id' => 2,
                'state_id' => 1,
                'name' => 'Mushin'
            ],
            [
                'id' => 3,
                'state_id' => 1,
                'name' => 'Surulere'
            ]
        ]);
    }
}
