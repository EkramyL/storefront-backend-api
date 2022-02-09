import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: parseInt(req.body.price),
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
};

export default product_routes;
