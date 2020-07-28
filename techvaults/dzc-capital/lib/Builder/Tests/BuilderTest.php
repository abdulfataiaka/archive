<?php

namespace Lib\Builder\Tests;

use PHPUnit\Framework\TestCase;
use Lib\Builder\Tests\Fixtures\BuilderChild;

class BuilderTest extends TestCase {
    public function testAction() {
        $gender = 'Male';
        $email = 'test@gmail.com';

        $builder = new BuilderChild;
        $builder->email = $email;
        $builder->gender = $gender;
        $result = $builder->toArray();

        $this->assertSame($result['email'], $email);
        $this->assertSame($result['gender'], $gender);
        $this->assertSame($result['name'], null);
    }
}
