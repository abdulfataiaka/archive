<?php

namespace App\Directives\Helpers;

use Closure;
use Illuminate\Support\Facades\Blade;

trait AssetPathHelper {
    /**
     * Create a directive for getting asset path with hash
     *
     * @param dir
     * @param ext
     * @param directive
     *
     * @return @void
     */
    private static function withHash($directive, $dir, $ext) {
        Blade::Directive($directive, function($name) use ($dir, $ext) {
            $filename = self::getFileName($name, $dir, $ext);
            return url("$dir/$filename");
        });
    }

    /**
     * Get the filename for file that match in directory
     *
     * @param dir
     * @param ext
     * @param name
     *
     * @return String
     */
    private static function getFileName($name, $dir, $ext) {
        $return = ':none';
        $pattern = "/^$name\..+?\.$ext$/";
        $handle = opendir(public_path($dir));

        while(($filename = readdir($handle)) !== false) {
            if(preg_match($pattern, $filename)) {
                $return = $filename;
                break;
            }
        }

        closedir($handle);
        return $return;
    }
}
