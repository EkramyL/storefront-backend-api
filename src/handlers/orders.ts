import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

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

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
};
export default order_routes;
