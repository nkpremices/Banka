[![Coverage Status](https://coveralls.io/repos/github/nkpremices/Banka/badge.svg?branch=develop)](https://coveralls.io/github/nkpremices/Banka?branch=develop)  [![Build Status](https://travis-ci.com/nkpremices/Banka.svg?branch=develop)](https://travis-ci.com/nkpremices/Banka) [![Maintainability](https://api.codeclimate.com/v1/badges/bee1220a16f6a543c205/maintainability)](https://codeclimate.com/github/nkpremices/Banka/maintainability)  
# Banka
A core banking operations web application

## User Interface [Banka](https://nkpremices.github.io/Banka/UI/)
* HTML.
* CSS.
* Javascript.

## Installation steps

* Clone the repo using ```git clone https://github.com/nkpremices/Banka.git```
* Run ```npm install``` 
* Create a ```.env``` file at the root of the project and fill out the variables you can find in ```.env.example``` file
* You need to at least set the ```NODE_ENV``` variable's value before running the command in the next step
* You can now run ```npm start``` to start the server

## Environment Variables

* ```NODE_ENV```: Node environment variable
* ```PORT```: The server's listening port
* ```ACCOUNT_NUMBER_LENGTH```: Length of account number on bank account creation
* ```JWT_KEY```: String used to creat tokens
* ```SALTING_ROUNDS```: Integer used to hash passwords
* ```ADMIN_TOKEN, ADMIN_EMAIL, ADMIN_PASSWORD```: Admin token email and password for testing purposes

## Steps for running tests

* Change the ```NODE_ENV``` environment variable value to "test"
* Run ```npm test``` 

## Documentation

All the API endpoints are documented and available [here](https://banka-heroku.herokuapp.com/docs/v1/)
