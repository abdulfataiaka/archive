<?php

namespace Lib\AuthToken\Lib;

use Lib\AuthToken\Lib\Record;
use Lib\AuthToken\Lib\Validators;
use Lib\AuthToken\Lib\InvalidModelError;
use Lib\AuthToken\Lib\TokenExpiredError;
use Lib\AuthToken\Lib\InvalidTokenError;
use Lib\AuthToken\Lib\InvalidSecretKeyError;

trait Helper {
    use Validators;

    /**
     * Get fields
     *
     * @return Array
     */
    private static function fields($all = false) {
        $fields = array_keys(static::FIELDS);
        if($all) $fields = array_merge($fields, [static::FIELD]);
        return $fields;
    }

    /**
     * Call out for the scret key
     *
     * @throws InvalidSecretKeyError
     *
     * @return String
     */
    private static function key() {
        $key = static::secret();

        if(is_string($key) && trim($key) != '') {
            return $key;
        }

        throw new InvalidSecretKeyError;
    }

    /**
     * Get the record object and validate
     *
     * @var params[Array]
     *
     * @throws InvalidModelError
     *
     * @return Record
     */
    private static function makeRecord($params) {
        $model = static::model($params);

        if($model && self::ensureModelFields($model)) {
            return new Record($model);
        }

        throw new InvalidModelError;
    }

    /**
     * Encrypt fields to hash
     *
     * @return Array;
     */
    private static function encryptFields($payload) {
        $result = [];

        foreach($payload as $field => $value) {
            if ((
                array_key_exists($field, static::FIELDS) &&
                static::FIELDS[$field]
            )) $value = md5($value);

            $result[$field] = $value;
        }

        return $result;
    }

    /**
     * Ensure payload has valid data
     *  [-] Field is one FIELDS or [iat]
     *  [-] {iat} field value has not expired
     *  [-] Compare hashed fields values and interchange
     *  [-] Compare values for other fields exluding [iat]
     *
     * @throws TokenExpiredError
     * @throws InvalidTokenError
     */
    private static function verifyIncomingPayload($record, $payload) {
        $result = [];
        $model = $record->model;

        foreach ($payload as $field => $value) {
            if($field == 'iat') {
                if (self::timeExpired($value)) {
                    throw new TokenExpiredError;
                }
            }

            else if(!in_array($field, self::fields())) {
                throw new InvalidTokenError;
            }

            else if(static::FIELDS[$field]) {
                if(md5($model->$field) == $value) {
                    $value = $model->$field;
                } else throw new InvalidTokenError;
            }

            else if($model->$field != $value) {
                throw new InvalidTokenError;
            }

            $result[$field] = $value;
        }

        return $result;
    }
}
