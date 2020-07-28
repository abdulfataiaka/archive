<?php

namespace Lib\Enum;

use Lib\Enum\Lib\Helper;

class Enum {
    use Helper;

    public static function get($value) {
        return array_flip(self::constants())[$value];
    }
}
