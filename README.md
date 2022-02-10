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
