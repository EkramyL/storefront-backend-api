import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
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
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};
export default user_routes;
