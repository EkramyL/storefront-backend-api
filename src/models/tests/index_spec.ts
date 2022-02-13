import { response } from 'express';
import supertest from 'supertest';
import authenticateToken from '../../middleware/authenticateToken';
import app from '../../server';
import { Order, OrderProduct, OrderStore } from '../order';
import { UserStore } from '../user';

const request = supertest(app);
const user = {
  firstname: 'Ekramy',
  lastname: 'Latief',
  username: 'Ekramyl',
  password: 'password',
};

describe('The user model end points', () => {
  it('1.gets the create user endpoint', async () => {
    const res = await request.post('/users').send(user);

    expect(res.status).toBe(200);
  });
  it('2.gets the users index endpoint', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request.get('/users').auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
  });

  it('3.Test show user with id=1 endpoint ', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request
      .get('/users/1')
      .auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});

describe('The product model end points ', () => {
  const product = {
    name: 'product1',
    price: 10,
  };
  it('1.gets the create product endpoint', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request
      .post('/products')
      .send(product)
      .auth(tok.body, { type: 'bearer' });
    expect(res.status).toBe(200);
  });

  it('2.gets the products index endpoint', async () => {
    const res = await request.get('/products');

    expect(res.status).toBe(200);
  });

  it('3.gets the product with id=1 endpoint', async () => {
    const res = await request.get('/products/1');

    expect(res.status).toBe(200);
  });
});
describe('The order model end points ', () => {
  it('gets the orders made by user with id=1 endpoint', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request
      .get('/orders/1')
      .auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});
