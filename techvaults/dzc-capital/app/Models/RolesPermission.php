<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RolesPermission extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role_id',
        'permission_id',
    ];
}
