<?php

namespace Lib\AuthToken\Lib;

trait Validators {
    /**
     * Ensure fields exists as props
     *
     * @return Boolean
     */
    private static function ensureModelFields($model) {
        foreach(self::fields(true) as $field) {
            if(!property_exists($model, $field)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check enpiration status of timestamp
     * Timeframe : 24hrs = 86400s
     *
     * @var timestamp[Long]
     *
     * @return Boolean
     */
    private static function timeExpired($timestamp) {
        if(!is_int($timestamp)) return false;

        $diff = time() - $timestamp;
        return $diff < 0 || $diff > 86400;
    }
}
