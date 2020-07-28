## Enum Service

Simple enum implementation for php

## Usage

#### Create an enum class

```php

use Lib\Enum\Enum;

class Gender extends Enum {
    public const MALE = 1;
    public const FEMALE = 2;
}

```

#### Use the class

```php

echo Gender::MALE // => 1
echo Gender::FEMALE // => 2

echo Gender::get(Gender::FEMALE) // => FEMALE

```
