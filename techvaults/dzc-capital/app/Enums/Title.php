<?php

namespace App\Enums;

use Lib\Enum\Enum;

//= WARNING: Data update can corrupt the business

class Title extends Enum {
    const MR = 1;
    const MRS = 2;
    const MISS = 3;
    const MASTER = 4;
}
