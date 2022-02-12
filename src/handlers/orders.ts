import express, { Request, Response } from 'express';
import { Order, OrderStore, OrderProduct } from '../models/order';
import authenticateToken from '../middleware/authenticateToken';
import jwt from 'jsonwebtoken';
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
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

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
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
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
    const order_id = req.params.id;
    const product_id = req.body.product_id;

    const productAdded = await store.addProduct(quantity, order_id, product_id);
    res.json(productAdded);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.post('/orders/:id/products', addProduct);
};
export default order_routes;
