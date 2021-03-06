# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

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

- add products to order (args: quantity, order id, product id) [token required] : '/orders/:id/products' [POST]
- Current Order by user (args: user id)[token required] : '/orders/:id' [GET]

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

### order_products

- id
- product_id
- order_id
- quantity

## Database

#### Database schema

- Users Table : (CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  username VARCHAR(100),
  password_digest VARCHAR
  );)

- Products Table : (CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  price integer NOT NULL
  );)

- Orders Table : (CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(15),
  user_id bigint REFERENCES users(id)
  );)

- OrderProducts Table : (CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
  );)
