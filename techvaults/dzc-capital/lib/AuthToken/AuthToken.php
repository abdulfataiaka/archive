<?php

namespace Lib\AuthToken;

use Firebase\JWT\JWT;
use Lib\AuthToken\Lib\Helper;
use Lib\AuthToken\Lib\Overrides;

class AuthToken {
    use Helper, Overrides;

    protected const FIELDS = [];
    protected const FIELD = 'token';
    protected const ALGORITHM = 'HS512';

    /**
     * Generate a new token
     *
     * @var params[Array]
     *
     * @return String
     */
    public static function make($params) {
        $record = static::makeRecord($params);
        $payload = $record->extract(self::fields());
        $payload = self::encryptFields($payload);
        $payload['iat'] = time();

        $field = static::FIELD;
        $record->model->$field = JWT::encode(
            $payload,
            self::key(),
            static::ALGORITHM
        );

        static::update($record);
        return $record->model->$field;
    }

    /**
     * Token verification
     *
     * @var token[String]
     *
     * @return Record
     */
    public static function verify($token) {
        $record = static::makeRecord([static::FIELD => $token]);

        $payload = JWT::decode(
            $token,
            self::key(),
            array(static::ALGORITHM)
        );

        $payload = self::verifyIncomingPayload(
            $record,
            $payload
        );

        return $record->model;
    }
}
