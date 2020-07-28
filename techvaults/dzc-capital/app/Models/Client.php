<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * Get the user record
     *
     * @return Relationship
     */
    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the avatar record
     *
     * @return Relationship
     */
    public function avatar() {
        return $this->hasOne(
            'App\Models\Upload',
            'id',
            'avatar_uid'
        );
    }

    /**
     * Get the investment record
     *
     * @return Relationship
     */
    public function investment() {
        return $this->hasOne(
            'App\Models\Investment',
            'user_id',
            'user_id'
        );
    }

    /**
     * Get the payment record
     *
     * @return Relationship
     */
    public function payment() {
        return $this->hasOne(
            'App\Models\Payment',
            'user_id',
            'user_id'
        );
    }
}
