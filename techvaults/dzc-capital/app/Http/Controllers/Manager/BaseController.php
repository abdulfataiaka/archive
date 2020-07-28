<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

class BaseController extends Controller {
    public function index() {
        return view('manager.base.index');
    }
}
