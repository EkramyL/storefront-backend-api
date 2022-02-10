import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/authenticateToken';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;
const store = new UserStore();

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
    const user: User = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      username: req.body.userName,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, tokenSecret as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', authenticateToken, index);
  app.get('/users/:id', authenticateToken, show);
  app.post('/users', authenticateToken, create);
};
export default user_routes;
