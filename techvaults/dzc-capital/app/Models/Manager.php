<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manager extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * Get the user object
     *
     * @return Relationship
     */
    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
