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
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

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
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
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
  app.post('/users', create);
};
export default user_routes;
