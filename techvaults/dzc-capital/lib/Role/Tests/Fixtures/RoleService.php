<?php

namespace Lib\Role\Tests\Fixtures;

use Lib\Role\Role as RoleLib;
use Lib\Role\Tests\Doubles\Role;
use Lib\Role\Tests\Doubles\UsersRole;

class RoleService extends RoleLib {
    protected const Role = Role::class;
    protected const UsersRole = UsersRole::class;
}
