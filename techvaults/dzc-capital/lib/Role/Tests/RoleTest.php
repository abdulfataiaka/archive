<?php

namespace Lib\Role\Tests;

use PHPUnit\Framework\TestCase;
use Lib\Role\Tests\Doubles\Role;
use Lib\Role\Tests\Fixtures\RoleService;

class RoleTest extends TestCase {
    protected function setUp(): void {
        $this->role = RoleService::create('any');
    }

    public function testGet() {
        $this->assertInstanceOf(Role::class, $this->role->get());
    }

    public function testAssignToUsers() {
        $return = $this->role->assignToUsers([1,2,3]);
        $this->assertSame($return, null);
    }
}
