<?php

namespace Lib\AuthToken\Lib;

use Exception;
use BadMethodCallException;

class Error extends Exception {}

class TokenExpiredError extends Error {}

class InvalidModelError extends Error {}

class InvalidTokenError extends Error {}

class InvalidSecretKeyError extends Error {}

class NotImplementedError extends BadMethodCallException {}
