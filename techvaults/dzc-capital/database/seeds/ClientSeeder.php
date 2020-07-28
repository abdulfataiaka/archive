<?php

use App\Enums\Title;
use App\Enums\Gender;
use App\Enums\Currency;
use App\Enums\UserType;
use App\Enums\OwnerType;
use App\Services\Constant;
use App\Services\RoleService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder {
    public function run() {
        $userId = DB::table('users')->insertGetId([
            'email_verified' => true,
            'email' => 'client@gmail.com',
            'user_type_id' => UserType::CLIENT,
            'password' => Hash::make('password'),
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('clients')->insert([
            'user_id' => $userId,
            'last_name' => 'Doe',
            'title_id' => Title::MR,
            'first_name' => 'Tesler',
            'gender_id' => Gender::MALE,
            'occupation' => 'Developer',
            'next_of_kin' => 'Ronda Doe',
            'date_of_birth' => new DateTime,
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('contacts')->insert([
            'city_id' => 1,
            'state_id' => 1,
            'country_id' => 1,
            'owner_id' => $userId,
            'address' => '4 Dogwood Street',
            'owner_type_id' => OwnerType::USER,
            'mobile_number' => '+234-090212098953',
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('payments')->insert([
            'branch' => 'Lekki',
            'user_id' => $userId,
            'bank_name' => 'Access',
            'sort_code' => '044151056',
            'account_name' => 'Tesler Doe',
            'account_number' => '06623849839',
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        DB::table('investments')->insert([
            'user_id' => $userId,
            'currency_id' => Currency::NAIRA,
            'created_at' => new DateTime,
            'updated_at' => new DateTime,
        ]);

        RoleService::create(Constant::CLIENT)
            ->assignToUsers($userId);
    }
}
