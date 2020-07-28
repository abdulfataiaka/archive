<?php

namespace Lib\AuthToken\Tests\Fixtures;

use Lib\AuthToken\AuthToken;
use Lib\AuthToken\Tests\Doubles\Model;

class AuthTokenService extends AuthToken {
    private static $testModel = null;

    public const TEST_ID = 2;
    public const TEST_FIELD = 'authtk';
    public const TEST_EMAIL = 'test@gmail.com';

    protected const FIELD = 'authtk';

    protected const ALGORITHM = 'HS256';

    protected const FIELDS = [
        'id' => true,
        'email' => false,
    ];

    protected static function secret() {
        return '312BBNDUR83R83';
    }

    protected static function model($params) {
        return self::testModel();
    }

    protected static function update($record) {
        return;
    }

    private static function testModel() {
        if(!self::$testModel) {
            self::$testModel = new Model(self::TEST_ID, self::TEST_EMAIL);
        }

        return self::$testModel;
    }
}
