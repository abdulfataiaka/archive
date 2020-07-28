<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model {
    /**
     * Deactivate management of timestamps
     *
     * @var timestamps
     */
    public $timestamps = false;

    /**
     * Get the states records
     *
     * @return Array
     */
    public function states() {
        return $this->hasMany('App\Models\State');
    }
}
