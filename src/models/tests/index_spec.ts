import { response } from 'express';
import supertest from 'supertest';
import authenticateToken from '../../middleware/authenticateToken';
import app from '../../server';
import { Order, OrderProduct, OrderStore } from '../order';
import { UserStore } from '../user';

const request = supertest(app);
// const user = {
//   firstname: 'Ekramy',
//   lastname: 'Latief',
//   username: 'Ekramyl',
//   password: 'password',
// };

// describe('The user model end points', () => {
//   it('1.gets the create user endpoint', async () => {
//     const res = await request.post('/users').send(user);

//     expect(res.status).toBe(200);
//   });
//   it('2.gets the users index endpoint', async () => {
//     const tok = await request.post('/users').send(user);
//     const res = await request.get('/users').auth(tok.body, { type: 'bearer' });

//     expect(res.status).toBe(200);
//   });

//   it('3.Test show user with id=1 endpoint ', async () => {
//     const tok = await request.post('/users').send(user);
//     const res = await request
//       .get('/users/1')
//       .auth(tok.body, { type: 'bearer' });

//     expect(res.status).toBe(200);
//   });
// });

// describe('The product model end points ', () => {
//   const product = {
//     name: 'product1',
//     price: 10,
//   };
//   it('1.gets the create product endpoint', async () => {
//     const tok = await request.post('/users').send(user);
//     const res = await request
//       .post('/products')
//       .send(product)
//       .auth(tok.body, { type: 'bearer' });
//     expect(res.status).toBe(200);
//   });

//   it('2.gets the products index endpoint', async () => {
//     const res = await request.get('/products');

//     expect(res.status).toBe(200);
//   });

//   it('3.gets the product with id=1 endpoint', async () => {
//     const res = await request.get('/products/1');

//     expect(res.status).toBe(200);
//   });
// });
// describe('The order model end points ', () => {
//   it('gets the orders made by user with id=1 endpoint', async () => {
//     const tok = await request.post('/users').send(user);
//     const res = await request
//       .get('/orders/1')
//       .auth(tok.body, { type: 'bearer' });

//     expect(res.status).toBe(200);
//   });
// });

const user1 = {
  firstname: 'Ekramy',
  lastname: 'Latief',
  username: 'Ekramyl',
  password: 'password',
};

const user2 = {
  firstname: 'Ekramy2',
  lastname: 'Latief2',
  username: 'Ekramyl2',
  password: 'password2',
};

const product = {
  name: 'product1',
  price: 10,
};

const order = {
  status: 'active',
  user_id: '1',
};

const orderProduct = {
  quantity: 5,
  product_id: '1',
  order_id: '1',
};
const store = new UserStore();
// const jsonHeaders = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
// };
let token: string;

describe('testing Endpoints', () => {
  beforeAll(async () => {
    //must have a user to start with
    const tok = await request.post('/users').send(user1);
    token = tok.body;
  });
  describe('Testing user Endpoints', () => {
    it('1.gets the create user endpoint', async () => {
      const res = await request.post('/users').send(user2);

      expect(res.status).toBe(200);
    });
    it('2.gets the users index endpoint', async () => {
      const res = await request.get('/users').auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
    });
    it('3.Test show user with id=1 endpoint ', async () => {
      const res = await request.get('/users/1').auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
    });
  });

  describe('Testing product Endpoint', () => {
    it('1.gets the create product endpoint', async () => {
      const res = await request
        .post('/products')
        .auth(token, { type: 'bearer' })
        .send(product);
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
<<<<<<< HEAD

  describe('The order model end points ', () => {
    it('1. gets the create order', async () => {
      const res = await request
        .post('/orders')
        .auth(token, { type: 'bearer' })
        .send(order);

      expect(res.status).toBe(200);
    });
    it('2. gets the add product to order', async () => {
      const res = await request
        .post('/orders/1/products')
        .auth(token, { type: 'bearer' })
        .send(orderProduct);

      expect(res.status).toBe(200);
    });
    it('3. gets the orders made by user with id=1 endpoint', async () => {
      const res = await request
        .get('/orders/1')
        .auth(token, { type: 'bearer' });

      expect(res.status).toBe(200);
    });
||||||| 9b30957
});
describe('The order model end points ', () => {
  it('gets the orders made by user with id=1 endpoint', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request
      .get('/orders/1')
      .auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
=======
});
describe('The order model end points ', () => {
  it('get the order of a specific user using its user id', async () => {
    const tok = await request.post('/users').send(user);
    const res = await request
      .get('/orders/1')
      .auth(tok.body, { type: 'bearer' });

    expect(res.status).toBe(200);
>>>>>>> 50ebb14fd464708e00d46047fbcaadc62cbf64a6
  });
});
