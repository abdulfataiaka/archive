<?php

use App\Enums\UserType;
use App\Services\Constant;
use App\Services\RoleService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ManagerSeeder extends Seeder {
    public function run() {
        $userId = DB::table('users')->insertGetId([
            'email_verified' => true,
            'email' => 'manager@gmail.com',
            'password' => Hash::make('password'),
            'user_type_id' => UserType::MANAGER,
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('managers')->insert([
            'user_id'  => $userId,
            'last_name' => 'Doe',
            'first_name' => 'Jane',
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        RoleService::create(Constant::MANAGER)
            ->assignToUsers($userId);
    }
}
