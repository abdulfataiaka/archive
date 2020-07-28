<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * Deactivate management of timestamps
     *
     * @var timestamps
     */
    public $timestamps = false;
}

