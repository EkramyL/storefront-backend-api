# THE PLANING

## API Endpoints

#### Products

- Index : '/products' [GET]
- Show : '/products/:id' [GET]
- Create [token required] : '/products' [POST]

#### Users

- Index [token required] :'/users' [GET]
- Show [token required] : '/users/:id' [GET]
- Create N[token required] : '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] : '/orders/:id' [GET]
- add products to order (args: quantity, order id, product id) [token required] : '/orders/:id/products' [POST]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- userName
- password

#### Orders

- id
- user_id
- status of order (active or complete)

#### order_products

- id
- product_id
- order_id
- quantity

## LOGIC

#### Setting the databases

- set two databases one for developement and the second for testing using postgres cli
- using the same way set a username and give it the previlage to act on these databases.
- the name of the databases and user and the password will be saved later in the .env file.
- set the port number to be (port : 5432) for both the database files

#### Setting the ENV

-install the dotenv librariry

- set a file with .env name where we put our enviromental varaiables
  ( variable we don't won't to share)
- we define two env collection of variables

  - ENV=dev where we spend most our time in development.it contain our dev database variables
    ( postgres databas name "POSTGRES_DB", postgres host "POSTGRES_HOST", username "POSTGRES_USER", user password "POSTGRES_PASSWORD)"

  - ENV=test where the testing happens which contain a different database name "POSTGRES_TEST_DB".

- the .env file will contain also a password for Bcrypt "BCRYPT_PASSWORD" salt rounds "SALT_ROUNDS"
  which is used for hashing passwords and also "TOKEN_SECRET" where we save the secret word for Token.

- SO the total variables in .env :
  {POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET}

#### Migration

- creating the required tables using db-migrate :
  - users table
  - products table
  - orders table
  - order_product table

#### Models & Handlers

- create model and hadler for :
  - users, products and orders
  - add order_products logic to the order model and handler.

#### Middleware

- create a middleware function to handle authentication of token.
- implement the middleware in the endpoint in which authentication is required.

#### Testing

- using jasmine make a file for testing for each model
- in order to run the test files in my order where i needed the user test to run
  first to ensure there is an effictive user id when i run the order test i put a
  number before each file name to ensure the arrangement (sorry if it was a bad practice)
