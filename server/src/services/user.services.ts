import User from '../models/user.model';
import { CreateUserProps } from '../types/user.types';
import bcryptjs from 'bcryptjs';

export const createUser = async ({
  username,
  email,
  password,
}: CreateUserProps) => {
  const hashPass = await bcryptjs.hash(password, 12);
  const res = await User.create({
    username,
    email,
    password: hashPass,
  });

  return res;
};

export const findUserByEmail = async (email: string) => {
  const res = await User.findOne({
    where: {
      email,
    },
  });
  return res;
};

export const findUserByPK = async (userId: number) => {
  const res = await User.findByPk(userId);
  return res;
};

export const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const findUserByToken = async (refreshToken: string) => {
  const res = await User.findOne({ where: { refreshToken } });
  return res;
};
