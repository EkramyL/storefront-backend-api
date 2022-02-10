import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('product model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined;
  });

  it('should have show method', () => {
    expect(store.show).toBeDefined;
  });

  it('should have create method', () => {
    expect(store.create).toBeDefined;
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'product1',
      price: 10,
    });
    expect(result).toEqual({
      id: 1,
      name: 'product1',
      price: 10,
    });
  });

  it('indexing all products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'product1',
        price: 10,
      },
    ]);
  });

  it('show a product with id=1', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'product1',
      price: 10,
    });
  });
});
