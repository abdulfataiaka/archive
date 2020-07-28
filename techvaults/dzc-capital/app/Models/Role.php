<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model {
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

    /**
     * Get permissions records
     *
     * @return Relationship
     */
    public function permissions() {
        return $this->hasManyThrough(
            'App\Models\Permission',
            'App\Models\RolesPermission',
            'role_id',
            'id',
            'id',
            'permission_id',
        );
    }
}
