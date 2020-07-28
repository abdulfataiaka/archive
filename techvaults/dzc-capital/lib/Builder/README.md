## Builder Service

Bind a set of fields fillable to instance and ensure those are the only once that can be filled. More features might be added in future to extend this library

## Usage

#### Create a builder class

```php

use Lib\Builder\Builder;

class BuilderChild extends Builder {
    protected const FIELDS = [
        'email',
        'user_id',
    ];
}

```

#### Use the class

```php

$builder = new BuilderChild;
$builder->user_id = 123;
$builder->email = 'test@gmail.com';

$all = $builder->toArray();
echo $all['email'];
echo $all['user_id'];

```
