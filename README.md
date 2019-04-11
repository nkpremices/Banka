[![Coverage Status](https://coveralls.io/repos/github/nkpremices/Banka/badge.svg?branch=develop)](https://coveralls.io/github/nkpremices/Banka?branch=develop)  [![Build Status](https://travis-ci.com/nkpremices/Banka.svg?branch=develop)](https://travis-ci.com/nkpremices/Banka) [![Maintainability](https://api.codeclimate.com/v1/badges/bee1220a16f6a543c205/maintainability)](https://codeclimate.com/github/nkpremices/Banka/maintainability)  
# Banka
A core banking operations web application. It is meant to support a single bank.

Users can signup and create bank acccounts online. 
To withdraw or deposit, they must visit a branch of the bank.

## Project development steps/requirements

### Steps(Requirements)
* UI Templates creation
* API endpoints creation with data structures
* API endpoints creation with a database
* Frontend implementation

### Already met

#### User Interface templates
##### Technologies used
* HTML.
* CSS.
* Javascript.

##### link
The UI is hosted on gGitHub pages. It's available on this [link](https://nkpremices.github.io/Banka/UI/)

#### Backend
##### Tools used
* Server side Framework : ​ [NodeJS](https://nodejs.org/en/) with [Express](http://expressjs.com/) : used for building fast APIs.
* Testing Framework: ​ [Mocha and Chai](https://www.youtube.com/watch?v=MLTRHc5dk6s)
* Style guide : [Airbnb](https://github.com/airbnb/javascript)
* Continuous Integration : [Travis](https://travis-ci.org/)
* Test coverage tool : [Istambull, nyc](https://istanbul.js.org/)
* Coverage badges on readme : [Coveralls](https://coveralls.io/) : Git badge.
* App deployement platform : [Heroku](https://www.heroku.com/)

##### Version
* V1 : API implementation with datastructures

##### Documentation

All the created API endpoints are documented and available [here](https://banka-heroku.herokuapp.com/docs/v1/)

### Under development
* two latest endpoints for v1

## Project structure

### UI templates

UI
├── assets
│   └── images
├── css
├── html
├── index.html
└── js

### Server structure

|── server
|    ├── api
|    │   └── v1
|    │       ├── controllers
|    │       ├── models
|    │       └── routes
|    ├── configs
|    ├── docs
|    │   └── v1
|    ├── helpers
|    │   └── v1
|    ├── middlewares
|    ├── storage
|    |── tests
|    │   └── v1
|    
|── .babelrc
|── .coverals.yml
|── .env
|── .env-example
|── .eslintres.json
|── .gitignore
|── .travis.yml
|── .package.json
|── README.md

## Getting started

### Installation steps

* Clone the repo using ```git clone https://github.com/nkpremices/Banka.git```
* Run ```npm install``` 
* Create a ```.env``` file at the root of the project and fill out the variables you can find in ```.env.example``` file
* You need to at least set the ```NODE_ENV``` variable's value before running the command in the next step
* You can now run ```npm start``` to start the server

#### Environment Variables

* ```NODE_ENV```: Node environment variable
* ```PORT```: The server's listening port
* ```ACCOUNT_NUMBER_LENGTH```: Length of account number on bank account creation
* ```JWT_KEY```: String used to creat tokens
* ```SALTING_ROUNDS```: Integer used to hash passwords
* ```ADMIN_TOKEN, ADMIN_EMAIL, ADMIN_PASSWORD```: Admin token email and password for testing purposes

### Steps for running tests

* Change the ```NODE_ENV``` environment variable value to "test"
* Run ```npm test``` 