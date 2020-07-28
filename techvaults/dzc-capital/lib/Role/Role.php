<?php

namespace Lib\Role;

use Lib\Role\Lib\Helper;

class Role {
    use Helper;

    protected const Role = null;
    protected const UsersRole = null;

    /**
     * Role code made private
     *
     * @var code
     */
    private $code = null;

    /**
     * Convinient way to create instance
     *
     * @return Role
     */
    public static function create($code) {
        return new static($code);
    }

    /**
     * Inject code to define role
     *
     * @return void
     */
    public function __construct($code) {
        $this->code = $code;
    }

    /**
     * Get a new or cached instance of the role
     *
     * @return Role[Model]
     */
    public function get() {
        if(!$this->instance) {
            $this->load();
        }

        return $this->instance;
    }

    /**
     * Assign to one or many users
     *
     * @return void
     */
    public function assignToUsers($userIds) {
        $model = static::UsersRole;

        if(!is_array($userIds)) {
            $userIds = [$userIds];
        }

        foreach ($userIds as $userId) {
            $model::updateOrCreate([
                'user_id' => $userId,
                'role_id' => $this->get()->id
            ]);
        }
    }
}
