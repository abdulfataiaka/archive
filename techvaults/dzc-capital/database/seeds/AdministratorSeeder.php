<?php

use App\Enums\UserType;
use App\Services\Constant;
use App\Services\RoleService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdministratorSeeder extends Seeder {
    public function run() {
        $userId = DB::table('users')->insertGetId([
            'email_verified' => true,
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'user_type_id' => UserType::ADMINISTRATOR,
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('managers')->insert([
            'user_id'  => $userId,
            'last_name' => 'Doe',
            'first_name' => 'John',
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        RoleService::create(Constant::ADMINISTRATOR)
            ->assignToUsers($userId);
    }
}
