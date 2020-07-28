<?php

namespace App\Models;

use Exception;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Model;

class NoUserRecordFound extends Exception {}

class User extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * Get the client record
     *
     * @return Relationship
     */
    public function client() {
        return $this->hasOne('App\Models\Client');
    }

    /**
     * Get the manager record
     *
     * @return Relationship
     */
    public function manager() {
        return $this->hasOne('App\Models\Manager');
    }

    /**
     * Get the contact record for user
     *
     * @return Contact
     */
    public function contact() {
        return DB::table('contacts')
             ->where('owner_id', $this->id)
             ->where('owner_type_id', OwnerType::USER)
             ->first();
     }

    /**
     * Get the roles records
     *
     * @return Relationship
     */
    public function roles() {
        return $this->hasMany(
            'App\Models\Role',
            'App\Models\UsersRole',
            'user_id',
            'id',
            'id',
            'role_id',
        );
    }

    /**
     * Get user record based on type
     *
     * @return Relationship
     */
    public function record() {
        if($this->is_client()) return $this->client;
        if($this->is_manager()) return $this->manager;
        throw new NoUserRecordFound;
    }

    /**
     * Check if user is client type
     *
     * @return Boolean
     */
    public function is_client() {
        return $this->user_type_id === UserType::CLIENT;
    }

    /**
     * Check if user is administrator type
     *
     * @return Boolean
     */
    public function is_administrator() {
        return $this->user_type_id === UserType::ADMINISTRATOR;
    }

    /**
     * Check if user is manager type
     *
     * @return Boolean
     */
    public function is_manager() {
        return (
            $this->user_type_id === UserType::MANAGER ||
            $this->user_type_id === UserType::ADMINISTRATOR
        );
    }

    /**
     * Get all permissions assigned to user
     *
     * @access private
     *
     * @return Array
     */
    private function permissions() {
        $result = [];

        foreach($this->roles as $role) {
            $result = array_merge($result, $role->permissions);
        }

        return $result;
    }
}
