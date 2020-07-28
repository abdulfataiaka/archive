<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');


Artisan::command('db:create {name}', function ($name) {
    //= TODO: Convert loggings to use logger object

    echo "\n[*] Creating database with name => '$name'";

    DB::statement("DROP DATABASE IF EXISTS $name");
    DB::statement("CREATE DATABASE $name");

    echo "\n[*] Database created successfully\n\n";

})->describe('Create a new database');
