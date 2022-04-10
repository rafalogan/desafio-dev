# CNAB Process Api
***

## Requires

* Node  
  * Express
  * Knex
  * docker
  * postgres

## Installation

to use  the api, you need to install the dependencies:

``` shell
npm install # to install all dependencies
npm start # to start the server
npm test # to run the tests
npm run build # to build the project
npm run test:cov # to run the tests with coverage
```

# additonal information

to use the knex to create new tables or alter existing tables, you can use the following commands:

``` shell
npm run knex:migrate:make -- <your migrate neme> # to create a new migration
npm run knex:migrate:latest # to run the latest migration
npm run knex:migrate:rollback # to rollback the last migration
```

# Development environment

to use the development environment, you need create a file called `.env` in the root directory of the project, and add the following lines:

``` .dotenv
# VARIABLES OF ENVIROMENT
# ENVIRONMENT
NODE_ENV=

# SERVER CONFIGS
PORT=
HOST=

# DATA BASE CONFIG CONNECTIONS RELATIONAL
DB_CLIENT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

# SECURITY CONFIGS
ENABLE_HTTPS=
CERT_FILE=
KEY_FILE=
AUTHSECRET=

# TIMEZONE
TIMEZONE=

```

the project use too `.env.test` to enviroment the test environment.
to procuction enviroment variables, you need user the `ecosystem.config.yml` file.


## Http endpoints

use the following endpoints to interact with the api:

* [GET] /process/:file  - to get the process of a file
* [GET] /transactions - to get all processed transactions
* [GET] /transactions/:store - to get a transaction by store

on procuction enviroment, the api the base url is `https://localhost:8080`    
on development enviroment, the api the base url is `http://localhost:3000`   
on test enviroment, the api the base url is `http://localhost:3001`
