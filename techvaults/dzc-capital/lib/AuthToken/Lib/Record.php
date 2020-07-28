<?php

namespace Lib\AuthToken\Lib;

class Record {
    public function __construct($model) {
        $this->model = $model;
    }

    public function __set($name, $value) {
        if ($name == 'model') {
            $this->$name = $value;
        }
    }

    /**
     * Extract fields from model
     *
     * @var fields[Array]
     *
     * @return Array
     */
    public function extract($fields) {
        $result = [];

        foreach($fields as $field) {
            $result[$field] = $this->model->$field;
        }

        return $result;
    }
}
