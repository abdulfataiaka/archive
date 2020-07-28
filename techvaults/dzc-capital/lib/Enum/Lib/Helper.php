<?php

namespace Lib\Enum\Lib;

use ReflectionClass;

trait Helper {
    private static function constants() {
        return (new ReflectionClass(static::class))
            -> getConstants();
    }
}
