<?php

namespace Lib\Role\Tests\Doubles;

class Role {
    public function __construct() {
        $this->id = 1;
    }

    public static function where() {
        return new self;
    }

    public static function first() {
        return new self;
    }
}
