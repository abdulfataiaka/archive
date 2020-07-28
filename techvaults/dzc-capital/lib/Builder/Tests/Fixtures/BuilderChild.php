<?php

namespace Lib\Builder\Tests\Fixtures;

use Lib\Builder\Builder;

class BuilderChild extends Builder {
    protected const FIELDS = [
        'name',
        'email',
        'gender',
    ];
}
