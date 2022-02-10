import { EnumType } from 'typescript';
import { Order, OrderStore } from '../order';

const store = new OrderStore();

describe('descripe the order model', () => {
  it('the index method is there', () => {
    expect(store.index).toBeDefined;
  });

  it('the show method is there', () => {
    expect(store.show).toBeDefined;
  });

  it('the create method is there', () => {
    expect(store.create).toBeDefined;
  });

  it('the addProduct method is there', () => {
    expect(store.addProduct).toBeDefined;
  });

  it('create method should add order', async () => {
    enum Status {
      'active' = 'active',
      'completed' = 'completed',
    }
    const result = await store.create({
      status: Status.active,
      user_id: '1',
    });
    expect(result).toEqual({
      id: 1,
      status: Status.active,
      user_id: '1',
    });
  });

  it('addProduct method should add product to the order_product table', async () => {
    const quantity = 3;
    const order_id = '1';
    const product_id = '1';

    const result = await store.addProduct(quantity, order_id, product_id);
    expect(result).toEqual({
      id: 1,
      quantity: quantity,
      order_id: order_id,
      product_id: product_id,
    });
  });
});
