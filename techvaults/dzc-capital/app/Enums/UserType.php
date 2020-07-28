<?php

namespace App\Enums;

use Lib\Enum\Enum;

//= WARNING: Data update can corrupt the business

class UserType extends Enum {
    const CLIENT = 1;
    const MANAGER = 2;
    const ADMINISTRATOR = 3;
}
