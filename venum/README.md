# venum
A frontend server for rendering webpages built with plain HTML, CSS and Vanilla Javascript ( ES5 )

## Releases
This module is currently under development and has not gotten to version 1.0.0 yet, it is expected to be a node nodule and available on npm node modules repository when the first version is available.

## Getting Started
First step is to clone the Repository
```
$ git clone https://github.com/abdulfataiaka/venum.git
```

After cloning is done, note the path to the `index.js` file at the root of the cloned **venum** directory, e.g `/path/to/venum/index.js`

## Prerequisites
Two important softwares needed to use **venum** are `npm` of at least version `v6.1.0` and `node` of at least version `v8.11.3`
```
Node installer comes with npm, So download the specific node installer compatible with your local 
machine by visiting the link below and ensure to select the appropriate version as suggested above
```
Visit [NodeJs Download Page](https://nodejs.org/en/download/) to install Node and NPM

## Usage

- First  create a javascript file anywhere on your machine, preferably within the `web template directory` you wish to serve, with any name of your choice, presently allowed but preferably `venum.js`

- Copy and paste in the below code with necessary substitutions into the file

```js
const Venum = require('/relative/path/to/cloned/venum/module');
const server = new Venum();

server.setup({
  base: '/path/to/web/template/directory'
});

server.router([]);
server.start();
```

The `.setup` method

> The only mandatory attribute required in the setup object, it the `base` attribute, with value which is the path to the `web template directory` the server will be serving from.

Other attributes that can be provided in the setup object to configure the server includes
- **port**   - To specify the port number to use if the default which is `3000` is in use
- **assets** - To specify the a list of asset folders which will hold static files from within html template files

The `.router` method

> This is called to create a router object to be used by the server, it takes an array as parameter, which holds the routes defined using the format illustrated below

```js
[
  {
    uri: '/about',
    purge: '<h2>About page</h2>'
  },
  {
    uri: '/dashboard',
    theme: '/dashboard/index.html'
  }
]
```
The `purge` attribute used is to allow passing plain text to be rendered by the server when the route is visited and this plain text can also be html, while the `theme` method is used to specify path to html file to be rendered when route is visited.

#### Start the server
> Start the server by executing the created javascript file for example `veum.js` with node as illustrated below.

```
$ node /path/to/venum.js
```

## Built with
- [NodeJs](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

## Authors
- **Abdulfatai Aka** - *Software Developer* at [Andela](https://www.andela.com)

## License
The project is licensed under the MIT License