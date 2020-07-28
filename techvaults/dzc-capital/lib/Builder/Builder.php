<?php

namespace Lib\Builder;

use Lib\Builder\Lib\Helper;

class Builder {
    use Helper;

    protected const FIELDS = [];

    public function __construct() {
        $this->bindFields();
    }

    public function toArray() {
        $record = [];

        foreach(static::FIELDS as $field) {
            $record[$field] = $this->$field;
        }

        return $record;
    }
}
