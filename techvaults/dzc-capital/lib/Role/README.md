## Role Manager

Manage roles on the system. This manager is coupled with API for eloquent, so use cautiously

## Features

- Get the role record
- Assign a role to users

## Usage

#### Create a role service class

```php

class RoleService extends Role {

}

```

#### Use the class

```php

$role = RoleService::get();
RoleService::assignToUsers([1,2,3,4]);

```
