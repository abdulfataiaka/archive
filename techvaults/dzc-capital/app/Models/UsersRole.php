<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersRole extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role_id',
        'user_id',
    ];

    /**
     * Deactivate management of timestamps
     *
     * @var timestamps
     */
    public $timestamps = false;
}
