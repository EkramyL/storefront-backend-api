import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import authenticateToken from '../middleware/authenticateToken';
const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const orders = await store.show(id);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: parseInt(req.body.user_id),
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const quantity = parseInt(req.body.quantity);
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);

    const productAdded = await store.addProduct(quantity, order_id, product_id);
    res.json(productAdded);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', authenticateToken, show);
  app.post('/orders', authenticateToken, create);
  app.post('/orders/:id/products', addProduct);
};
export default order_routes;
