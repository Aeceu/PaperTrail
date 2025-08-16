import express from 'express';
import {
  HandleGetUser,
  HandleGetUsers,
  HandleLogin,
  HandleLogout,
  HandleRefreshToken,
  HandleSignup,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/user', HandleGetUser);
router.get('/users', HandleGetUsers);
router.post('/signup', HandleSignup);
router.post('/login', HandleLogin);
router.get('/refresh', HandleRefreshToken);
router.get('/logout', HandleLogout);

export default router;
