import { Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserByToken,
  getAllUsers,
} from '../services/user.services';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';

export const HandleSignup = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const userExist = await findUserByEmail(data.email);

    if (userExist) {
      res.status(404).json('User already exists!');
    }

    const user = await createUser({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const HandleLogin = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const user = await findUserByEmail(data.email);

    if (!user) {
      return res.status(403).json('User does not exists!');
    }

    const validPass = await bcryptjs.compare(data.password, user.password);
    if (!validPass) {
      return res.status(403).json('Incorrect password!');
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = jwt.sign(userData, process.env.TOKEN_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(userData, process.env.TOKEN_SECRET!, {
      expiresIn: '7d',
    });

    user.refreshToken = refreshToken;
    user.save();

    res.cookie('jwt', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: 'User logged in successfully!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
    });
  } catch (error) {
    console.log('Login error:', error);
    res.status(500).json(error);
  }
};

export const HandleGetUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const user = await findUserByEmail(data.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const HandleGetUsers = async (_req: Request, res: Response) => {
  try {
    const user = await getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const HandleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ where: { refreshToken } });

  if (!foundUser) return res.sendStatus(403); // Forbidden

  let decoded: JwtPayload | null = null;

  try {
    decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET!) as JwtPayload;
  } catch (error) {
    return res.sendStatus(403);
  }

  if (decoded?.id !== foundUser.id) return res.sendStatus(403);

  const accessToken = jwt.sign(
    {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    },
    process.env.TOKEN_SECRET!,
    {
      expiresIn: '15m',
    }
  );

  res.status(200).json({
    user: {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    },
    accessToken,
  });
};

export const HandleLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await findUserByToken(refreshToken);
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.status(204).json({ message: 'Successfully logout!' });
    }

    foundUser.refreshToken = '';
    foundUser.save();

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.status(204).json({ message: 'Successfully logout!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to logout!',
    });
  }
};
