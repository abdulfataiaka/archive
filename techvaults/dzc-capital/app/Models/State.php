<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model {
    /**
     * Deactivate management of timestamps
     *
     * @var timestamps
     */
    public $timestamps = false;

    /**
     * Get the country record
     *
     * @return Relationship
     */
    public function country() {
        return $this->belongsTo('App\Models\Country');
    }

    /**
     * Get the cities records
     *
     * @return Relationship
     */
    public function cities() {
        return $this->hasMany('App\Models\City');
    }
}
