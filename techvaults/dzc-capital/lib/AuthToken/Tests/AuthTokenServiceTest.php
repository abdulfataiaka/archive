<?php

namespace Lib\AuthToken\Tests;

use PHPUnit\Framework\TestCase;
use Lib\AuthToken\Tests\Fixtures\AuthTokenService;

class AuthTokenServiceTest extends TestCase {
    public function testMake() {
        $token = AuthTokenService::make(['what' => 'ever']);

        $this->assertTrue(is_string($token));
        $this->assertTrue(strlen($token) > 100);
    }

    public function testVerify() {
        $field = AuthTokenService::TEST_FIELD;
        $token = AuthTokenService::make(['what' => 'ever']);
        $model = AuthTokenService::verify($token);

        $this->assertSame($model->$field, $token);
    }
}
