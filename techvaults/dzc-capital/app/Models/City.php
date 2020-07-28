<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model {
    /**
     * Deactivate management of timestamps
     *
     * @var timestamps
     */
    public $timestamps = false;

    /**
     * Get the state record
     *
     * @return Relationship
     */
    public function state() {
        return $this->belongsTo('App\Models\State');
    }
}
