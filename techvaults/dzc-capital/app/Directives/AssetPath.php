<?php

namespace App\Directives;

use Illuminate\Support\Facades\Blade;

class AssetPath {
    use \App\Directives\Helpers\AssetPathHelper;

    /**
     * Asset path directives declaration
     *
     * @return void
     */
    public static function call() {
        self::js();
        self::css();
        self::image();
    }

    /**
     * Javascript asset path directive declaration
     *
     * @return void
     */
    private static function js() {
        self::withHash('js', 'js', 'js');
    }

    /**
     * Style asset path directive declaration
     *
     * @return void
     */
    private static function css() {
        self::withHash('css', 'css', 'css');
    }

    /**
     * Image asset path directive declaration
     *
     * @return void
     */
    private static function image() {
        Blade::Directive('image', function($name) {
            return url("images/$name");
        });
    }
}
