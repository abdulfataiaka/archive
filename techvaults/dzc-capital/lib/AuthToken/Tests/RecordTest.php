<?php

namespace Lib\AuthToken\Tests;

use Lib\AuthToken\Lib\Record;
use PHPUnit\Framework\TestCase;
use Lib\AuthToken\Tests\Doubles\Model;

class RecordTest extends TestCase {
    protected function setUp(): void {
        parent::setUp();
        $this->id = 1;
        $this->email = 'test@gmail.com';

        $this->model = new Model(
            $id = $this->id,
            $email = $this->email
        );

        $this->record = new Record($this->model);
    }

    public function testAttributes() {
        $this->assertSame($this->record->model->authtk, null);
        $this->assertSame($this->record->model, $this->model);
        $this->assertSame($this->record->model->id, $this->id);
        $this->assertSame($this->record->model->email, $this->email);
    }

    public function testExtract() {
        $expected = [
            'id' => $this->id,
            'email' => $this->email
        ];

        $result = $this->record->extract(array_keys($expected));
        $this->assertSame($result, $expected);
    }
}
