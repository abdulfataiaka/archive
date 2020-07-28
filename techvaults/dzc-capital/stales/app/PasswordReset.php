<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model {
    /**
     *
     * Attribute for mass storage
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'token'
    ];
}
