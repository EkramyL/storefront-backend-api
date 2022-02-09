import client from '../database';

enum Status {
  'active' = 'active',
  'completed' = 'completed',
}

export type Order = {
  id?: number;
  status: Status;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can't get orders. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get order with the id:${id} . Error: ${error}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2)';
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create order . Error: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (quantity, order_id, product_id) VALUES ($1, $2, $3)';
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to add product . Error: ${error}`);
    }
  }
}
