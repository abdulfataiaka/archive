## DZC Capital

Staging Application: https://dzc-capital-staging.herokuapp.com

A customer relations management system to onboard clients interested in the investment business onto the system and enable them to track their investment returns.

## Technologies

- [PHP/Laravel](https://laravel.com/)
- [JavaScript(ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node Runtime](https://nodejs.org/en/)
- [MySQL Database](https://www.mysql.com/)
- [Docker & Compose](https://www.docker.com/) 

## Getting Started

- Clone repository with the command below

```bash
$ git clone <repo-url>
```

- Ensure you have composer installed visit https://getcomposer.org/download/

- Ensure MySQL server is running

- Update `.env ` file with database connection credentials

- Ensure dependencies are installed with command below

```bash
$ composer install
```

- Run migrations and seeds

```bash
$ php artisan migrate
```

```bash
$ php artisan db:seed 
```

- Run the application

```bash
$ php artisan serve
```

## Asset Pipeline (Client Folder)

#### Folder Structure

The `src` folder
- Contains typescript modules and manifest files
- Each sub-folder must contain a manifest file except for `src/lib`

The `src/common` folder
- Contains typescript modules required on all pages (main layout)

The `src/lib` folder
- Contains typescript modules service as support for other modules

Other `src/{custom}` folders
- Contains typescript modules for a specific page or a group of selected pages

#### Conventions

The names of sub-folders in `src` folder should correspond only to the following
- View any of the view files in layouts
- Name of sub-folder in views folder excluding `layouts`

#### Manifest Files

Each of the sub-folders in `src` folder are expected to have a manifest file named `index.ts`, except the `lib` sub-folder. These manifest files must explicitly import counterpart `scss` manifest file (`index.scss`) if available otherwise there won't be any `css` bundle generated for it.

## Authors

- *Abdulfatai Aka* . abdulfataiaka@gmail.com
- *Yusuf Ariyibi* . ola.muhammad.om@gmail.com
- *Ibrahim Bello* . developerbello@gmail.com
