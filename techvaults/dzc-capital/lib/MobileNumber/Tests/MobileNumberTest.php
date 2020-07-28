<?php

namespace Lib\MobileNumber\Tests;

use PHPUnit\Framework\TestCase;

class MobileNumberTest extends TestCase {
    protected function setUp(): void {
        $this->code = '+234';
        $this->number = '090212098953';
    }

    public function testValidFormat() {
        $joined = "$this->code-$this->number";
        $mobile = new MobileNumber($joined);

        $this->assertSame($mobile->valid(), true);
        $this->assertSame($mobile->code, $this->code);
        $this->assertSame($mobile->number, $this->number);
        $this->assertSame($mobile->merged(), $joined);
    }

    public function testInValidFormat() {
        $joined = "$this->number-$this->code";
        $mobile = new MobileNumber($joined);

        $this->assertSame($mobile->valid(), false);
        $this->assertSame($mobile->code, null);
        $this->assertSame($mobile->number, null);
        $this->assertSame($mobile->merged(), '');
    }
}
