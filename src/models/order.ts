import client from '../database';

enum Status {
  'active' = 'active',
  'completed' = 'completed',
}

export type Order = {
  id?: number;
  status: Status;
  user_id: string;
};
export type OrderProduct = {
  id?: number;
  quantity: number;
  product_id: string;
  order_id: string;
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

  async show(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to get order with the id:${id} . Error: ${error}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create order . Error: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to add product . Error: ${error}`);
    }
  }
}
