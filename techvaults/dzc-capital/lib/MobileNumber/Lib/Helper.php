<?php

namespace Lib\MobileNumber\Lib;

trait Helper {
    private function parse($raw) {
        $parts = explode('-', $raw);
        if(count($parts) !== 2) return;
        $this->code = $this->parseCode(trim($parts[0]));
        $this->number = $this->parseNumber(trim($parts[1]));
    }

    private function parseCode($code) {
        return preg_match('/^\+\d+$/', $code) ? $code : null;
    }

    private function parseNumber($number) {
        return preg_match('/^\d+$/', $number) ? $number : null;
    }
}
