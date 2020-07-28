<?php

namespace Lib\Role\Lib;

use Lib\Role\Lib\RoleNotFoundError;

trait Helper {
    private $instance = null;

    /**
     * Load the role instance from data store
     * Model must have the {code} field
     *
     * @var instance [ops:update]
     *
     * @return void
     */
    private function load() {
        $this->instance = (static::Role)::where('code', $this->code)->first();
        if(!$this->instance) throw new RoleNotFoundError;
    }
}
