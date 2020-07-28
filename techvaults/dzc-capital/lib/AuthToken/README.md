## Auth Token Service

Token service relying on a data store for validation

Tokens Locations: `memory` & `persisted`

Validations
- Token string are the same
- Token payloads are the same
- Still within expiry date

Payload
- Issue DateTime
- Normal Fields (optional)
- Hashed Fields (optional)

## Usage

#### We can create an auth token service out of this library

```php

use App\Models\User;
use Lib\AuthToken\AuthToken;

class AuthTokenService extends AuthToken {
    protected const FIELD = 'token';
    protected const ALGORITHM = 'HS256';

    protected const FIELDS = [
        'email' => false,
        'user_id' => true,
    ];

    protected static function secret() {
        //= Return somme secret string
    }
    
    protected static function model($params) {
        //= Params can only be FIELD or from FIELDS
    }

    protected static function update($record) {
        //= update record with new token token
    }
}

```

#### Generating and validating tokens

```php

//= Generate token

$params = [
    'email' => 'email',
    'password' => 'password'
];

$token = AuthTokenService::make($params);

//= Validate token

//= You might want to capture exception such as
//=    [-] TokenExpiredError
//=    [-] InvalidTokenError

try {
    $model = AuthTokenService::verify($token);
} catch(TokenExpiredError $ex) {
    //= Handle error
} catch(InvalidTokenError $ex) {
    //= Handle error
}

```
