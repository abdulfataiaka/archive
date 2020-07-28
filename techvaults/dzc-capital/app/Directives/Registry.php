<?php

namespace App\Directives;

use App\Directives\AssetPath;

class Registry {
    public static function call() {
        AssetPath::call();
    }
}