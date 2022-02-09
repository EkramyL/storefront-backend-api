import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, tokenSecret as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default authenticateToken;
