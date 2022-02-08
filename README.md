# THE PLANING

## API Endpoints

#### Products

- Index : '/products' [GET]
- Show : '/products/:id' [GET]
- Create [token required] : '/products' [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] :'/users' [GET]
- Show [token required] : '/users/:id' [GET]
- Create N[token required] : '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] : '/orders/:id' [GET]
- add products to order (args: quantity, order id, product id) [token required] : '/orders/:id/products' [POST]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

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
  - add order_products logic to the order model and handler
