## MobileNumber Format Manager

To ensure the usage of a unified mobile number format across the application

## Usage

```php

$mobile = MobileNumber('+234-09021208953');

echo $mobile->valid() // => true
echo $mobile->code // => +234
echo $mobile->number // => 09021208953
echo $mobile->merged() // => +234-09021208953

```
