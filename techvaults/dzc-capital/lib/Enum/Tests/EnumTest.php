<?php

namespace Lib\Enum\Tests;

use PHPUnit\Framework\TestCase;
use Lib\Enum\Tests\Fixtures\EnumChild;

class EnumTest extends TestCase {
    public function testAction() {
        $this->assertSame(EnumChild::VALUE, 1);
        $this->assertSame(EnumChild::get(EnumChild::VALUE), 'VALUE');
    }
}
