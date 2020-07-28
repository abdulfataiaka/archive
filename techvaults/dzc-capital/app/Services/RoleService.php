<?php

namespace App\Services;

use App\Models\Role;
use App\Models\UsersRole;
use Lib\Role\Role as RoleLib;

class RoleService extends RoleLib {
    protected const Role = Role::class;
    protected const UsersRole = UsersRole::class;
}
