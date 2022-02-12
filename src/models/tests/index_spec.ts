import { response } from 'express';
import supertest from 'supertest';
import authenticateToken from '../../middleware/authenticateToken';
import app from '../../server';
import { Order, OrderProduct, OrderStore } from '../order';
import { UserStore } from '../user';

const request = supertest(app);

it('gets the create user endpoint', async () => {
  const user = {
    firstname: 'Ekramy',
    lastname: 'Latief',
    username: 'Ekramyl',
    password: 'password',
  };
  const res = await request.post('/users').send(user);

  expect(res.status).toBe(200);
});

describe('Test show user with id=1 endpoint  ', () => {
  it('gets the api endpoint', async () => {
    let auth = {};
    const user = {
      firstname: 'Ekramy',
      lastname: 'Latief',
      username: 'Ekramyl',
      password: 'password',
    };

    const tok = await request.post('/users').send(user);
    const res = await request
      .get('/users/1')
      .auth(tok.body, { type: 'bearer' });
    //   .expect(200);

    expect(res.status).toBe(200);
  });
});

describe('Test index users endpoint with authentication ', () => {
  it('gets the users index endpoint', async () => {
    const user = {
      firstname: 'Ekramy',
      lastname: 'Latief',
      username: 'Ekramyl',
      password: 'password',
    };
    const tok = await request.post('/users').send(user);
    const res = await request.get('/users').auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});

describe('Test create products ', () => {
  it('gets the create product endpoint', async () => {
    const product = {
      name: 'product1',
      price: 10,
    };
    const res = await request.post('/products').send(product);
    expect(res.status).toBe(200);
  });
});

describe('Test index products endpoint', () => {
  it('gets the products endpoint', async () => {
    const res = await request.get('/products');

    expect(res.status).toBe(200);
  });
});

describe('Test show products endpoint', () => {
  it('gets the product with id=1 endpoint', async () => {
    const res = await request.get('/products/1');

    expect(res.status).toBe(200);
  });
});
