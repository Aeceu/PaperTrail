import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authheader = req.headers.authorization || req.headers.authorization;
  if (!authheader?.toLowerCase().startsWith('bearer '))
    return res.sendStatus(401);

  const token = authheader.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token!

    const payload = decoded as { id: number; username: string; email: string };
    req.user = payload;
    next();
  });
};
