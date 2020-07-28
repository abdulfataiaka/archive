<?php

namespace Lib\AuthToken\Tests\Doubles;

class Model {
    public function __construct($id = null, $email = null) {
        $this->id = $id;
        $this->authtk = null;
        $this->email = $email;
    }
}
