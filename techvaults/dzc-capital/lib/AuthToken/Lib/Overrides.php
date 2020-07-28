<?php

namespace Lib\AuthToken\Lib;

use Lib\AuthToken\Lib\NotImplementedError;

trait Overrides {
    /**
     * Implementation for getting secret key
     *
     * @throws NotImplementedError
     */
    private static function secret() {
        /**
         * @return String
         */
        throw new NotImplementedError;
    }

    /**
     * Implementation for getting persisted record
     *
     * @var params[Array]
     *
     * @throws NotImplementedError
     */
    protected static function model($params) {
        /**
         * @return Object
         */
        throw new NotImplementedError;
    }

    /**
     * Implementation for saving token
     *
     * @var record[Record]
     *
     * @throws NotImplementedError
     */
    protected static function update($record) {
        /**
         * @return void
         */
        throw new NotImplementedError;
    }
}