[![Coverage Status](https://coveralls.io/repos/github/nkpremices/Banka/badge.svg?branch=develop)](https://coveralls.io/github/nkpremices/Banka?branch=develop)  [![Build Status](https://travis-ci.com/nkpremices/Banka.svg)](https://travis-ci.com/nkpremices/Banka) [![Maintainability](https://api.codeclimate.com/v1/badges/bee1220a16f6a543c205/maintainability)](https://codeclimate.com/github/nkpremices/Banka/maintainability)  

# Banka
A core banking operations web application. It is meant to support a single bank.

Users can signup and create bank acccounts online. 
To withdraw or deposit, they must visit a branch.

## Project development steps/requirements

### Steps(Requirements)
* UI Templates creation
* API endpoints creation with data structures
* API endpoints creation with a database
* Frontend implementation

### Already met

#### 1. User Interface templates
##### Technologies used
* HTML.
* CSS.
* Javascript.

##### Link
The UI is hosted on GitHub pages and available [here](https://nkpremices.github.io/Banka/UI/)

#### 2. Backend
##### Tools used
* Server side Framework : ​ [NodeJS](https://nodejs.org/en/) with [Express](http://expressjs.com/)
* Testing Framework: ​ [Mocha and Chai](https://www.youtube.com/watch?v=MLTRHc5dk6s)
* Style guide : [Airbnb](https://github.com/airbnb/javascript)
* Continuous Integration : [Travis](https://travis-ci.org/)
* Test coverage tool : [Istambull, nyc](https://istanbul.js.org/)
* Coverage badges on readme : [Coveralls](https://coveralls.io/)
* App deployement platform : [Heroku](https://www.heroku.com/)

##### Version
* V1 : API implementation with datastructures
###### Endpoints 

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index page |
| /api/v1/auth/signup| POST | Sign up a new user(client, staff or admin) |
| /api/v1/auth/signin| POST | Sign in |
| /api/v1/accounts| POST | Create a user bank account |
| /api/v1/accounts/:accountNumber| PATCH| Update specific bank account's status |
| /api/v1/accounts/:accountNumber| DELETE| Delete specific bank account |
| /api/v1/transactions/:accountNumber/debit| POST| Debit specific user bank account |
| /api/v1/transactions/:accountNumber/credit| POST| Credit specific user bank account |

* V2 : API implementation with a database
###### Endpoints 

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index page |
| /api/v2/auth/signup| POST | Sign up a new user(client, staff or admin) |
| /api/v2/auth/signin| POST | Sign in |
| /api/v2/accounts| POST | Create a user bank account |
| /api/v2/accounts/:accountNumber| PATCH| Update specific bank account's status |
| /api/v2/accounts/:accountNumber| DELETE| Delete specific bank account |
| /api/v2/transactions/:accountNumber/debit| POST| Debit specific user bank account |
| /api/v2/transactions/:accountNumber/credit| POST| Credit specific user bank account |
| /api/v2/accounts/:accountNumber/transactions | GET| View an account’s transaction history |
| /api/v2/transactions/:transactionIid | GET| View a specific transaction |
| /api/v2/user/:email/accounts | GET| View all accounts owned by a specific user (client)|
| /api/v2/accounts/:accountNumber| GET| View a specific account’s details |
| /api/v2/accounts | GET| View a list of all bank accounts |
| /api/v2/accounts?status=active | GET| View a list of all active bank accounts |
| /api/v2/accounts?status=dormant | GET| View a list of all dormant bank accounts |

##### Documentation

All the created API endpoints are documented and available [here](https://banka-heroku.herokuapp.com/docs/v2/)

### 3. Under development
* Front end implementation
 

## Project structure

### 1. UI templates

```UI
   ├── assets
   │   └── images
   ├── css
   ├── html
   ├── index.html
   └── js
   ```
   ### 2. Server 
   
   ```
    |── server
    |    ├── api
    |    │   └── v1
    |    │   │   ├── controllers
    |    │   │   ├── models
    |    │   │   └── routes
    |    │   └── v2
    |    │       ├── controllers
    |    │       ├── models
    |    │       └── routes
    |    ├── configs
    |    ├── docs
    |    │   └── v1
    |    │   └── v2
    |    ├── helpers
    |    │   └── v1
    |    │   └── v2
    |    ├── middlewares
    |    ├── storage
    |    |── tests
    |        └── v1
    |        └── v2
    |    
    |── .babelrc
    |── .coverals.yml
    |── .env
    |── .env-example
    |── .eslintres.json
    |── .gitignore
    |── .travis.yml
    |── .package.json
    └── README.md
```

## Getting started

### 1. Installation steps

* Clone the repo using

```git clone https://github.com/nkpremices/Banka.git```

* Install dependecies by runing

```npm install``` 

* Create a ```.env``` file at the root of the project and fill out the variables you can find in ```.env.example``` file
* You need to at least set the ```NODE_ENV``` variable's value before running the command in the next step
* You can now run ```npm start``` to start the server

#### 2. Environment Variables

* ```NODE_ENV```: Node environment variable
* ```PORT```: The server's listening port
* ```ACCOUNT_NUMBER_LENGTH```: Length of account number on bank account creation
* ```JWT_KEY```: String used to creat tokens
* ```SALTING_ROUNDS```: Integer used to hash passwords
* ```ADMIN_TOKEN, ADMIN_EMAIL, ADMIN_PASSWORD, TEST_DB_NAME, TEST_USER_TOKEN```: Admin token email, password, test database name and test user token for testing purposes
* ```DB_USER, DB_HOST, DEV_DB_NAME, DB_PASSWORD, DB_PORT```: Database connection variables

### 3. Notes
* When the server starts, a script creates the first admin user. He will be the one to create staff users and other admin users as well. 
* To login the admin, use these credentials: 

```
{
	"email": "admin@gmail.com",
    "password": "passWord1"
}
```
* The ```ADMIN_EMAIL, ADMIN_PASSWORD``` environnement variables will be the credentials above
* Every operation inside the banka app requires authentication (login)

### 3. Steps for running tests

* Run tests
```npm test``` 

