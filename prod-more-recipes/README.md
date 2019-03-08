[![Build Status](https://travis-ci.org/abdulfataiaka/prod-more-recipes.svg?branch=staging)](https://travis-ci.org/abdulfataiaka/prod-more-recipes?branch=staging) [![Maintainability](https://api.codeclimate.com/v1/badges/e883bf33a39a5038e038/maintainability)](https://codeclimate.com/github/abdulfataiaka/prod-more-recipes/maintainability) [![Coverage Status](https://coveralls.io/repos/github/abdulfataiaka/prod-more-recipes/badge.svg?branch=staging&service=github)](https://coveralls.io/github/abdulfataiaka/prod-more-recipes?branch=staging) [![Test Coverage](https://api.codeclimate.com/v1/badges/e883bf33a39a5038e038/test_coverage)](https://codeclimate.com/github/abdulfataiaka/prod-more-recipes/test_coverage)

# More Recipes

This is a platform which allow users to share the recipe ideas they have learn't or invented

Hosted at : https://prod-more-recipes.herokuapp.com

Template  : https://abdulfataiaka.github.io/prod-more-recipes/template  

API Docs  : https://abdulfataiaka.github.io/prod-more-recipes/api-docs


The platform provides the following features

*  User registration
*  User login
*  Add recipes
*  Update recipe
*  Delete recipe
*  Add recipes as favourites
*  Remove recipe from favorites
*  Upvoting recipes
*  Downvoting recipes
*  Posting reviews on recipes

## Getting Started

Follow the below steps to get the application running fast on you local machine

*  Clone the repository `>> git clone https://github.com/abdulfataiaka/prod-more-recipes.git`

*  Install all dependencies `>> npm install`

*  Create a .env file at the root of the project and copy the content of .env.example file into it with you preferences

*  Start the application `>> npm start`

*  Navigate to `http://localhost:8081/` in your browser

### Prerequisites

```Install Nodejs```

*  Download Nodejs application from  `https://nodejs.org/en/download/`

*  Install the downloaded package and test by typing node in terminal.

```Install the PostgreSql database server on your local machine```

*  Download a copy of the software for your machine operating system from `https://www.postgresql.org/download/`

*  Install the downloaded software on your machine

*  Open the installed package and create a database with the name `more_recipes_db`


## Running the tests

The tests are handle by both mocha nad chai which you must have install when you did `>> npm install`
To run the tests run `>> npm test`

### coding style tests

```
This is checked with eslint using the airbnb style guild. To test the code style in your editor, run ... 

>> npm run eslint

```

## Deployment

Deployment on heroku

```

To deploy this application on heroku, note that after cloning the repository, a Procfile is found in project root 
directory, so follow the below steps to setup the application on heroku...

1.  Create an account on heroku at https://dashboard.heroku.com/login

2.  Create an heroku application and link it to the github reopsitory.

3.  Add Heroku Postgres Addon to the application, this will add DATABASE_URL environment variable to
    the application config variables.

4.  Add a SECRET_KEY environment variable to the application, just as it is in you .env file.
5   Then deploy the app.

```

## Built With

* [ECMAScript 6](http://es6-features.org/) - Version of JavaScript with new features different from tat of ES6
* [ReactJs](https://reactjs.org/) - A frontend JavaScript framework developed by Facebook
* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps
* [Babel](https://babeljs.io/) - Babel is used to transpile es6 down to es5.
* [Webpack](https://webpack.js.org/) - Webpack is used to bundle modules with dependencies and run mundane tasks.
* [Axios](https://www.axios.com/) - Axios is an http client library used in making API calls.
* [Nodejs](https://nodejs.org/en/docs/) - For server-side developments


## Contributing

Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:

Fork the project to your repository then clone it to your local machine.
Create a new branch and make features that will enhance it and create pull requests

## Authors

* **Abdulfatai Aka** - *Work* - [Andela](https://www.andela.com)

## License

MIT  Abdulfatai Aka

Licensed under the MIT License.