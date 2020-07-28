<?php

namespace Lib\Builder\Lib;

trait Helper {
    private function bindFields() {
        foreach(static::FIELDS as $field) {
            $this->$field = null;
        }
    }
}
