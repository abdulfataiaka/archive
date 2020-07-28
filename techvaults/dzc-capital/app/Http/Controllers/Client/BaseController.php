<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;

class BaseController extends Controller {
    public function index() {
        return view('client.base.index');
    }
}
