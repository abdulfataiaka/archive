<?php

namespace App\Enums;

use Lib\Enum\Enum;

//= WARNING: Data update can corrupt the business

class Gender extends Enum {
    const MALE = 1;
    const FEMALE = 2;
    const OTHERS = 3;
}
