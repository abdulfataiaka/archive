<?php

namespace Lib\MobileNumber;

use Lib\MobileNumber\Lib\Helper;

class MobileNumber {
    use Helper;

    public function __construct($raw) {
        $this->code = null;
        $this->number = null;
        $this->parse($raw);
    }

    public function valid() {
        return $this->code && $this->number;
    }

    public function merged() {
        return $this->valid() ? "$this->code-$this->number" : '';
    }
}
