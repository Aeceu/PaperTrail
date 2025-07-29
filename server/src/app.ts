import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB';

import userRoute from './routes/user.routes';
import folderRoute from './routes/folder.routes';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', userRoute);
app.use('/api/v1', folderRoute);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 4200;

    app.listen(PORT, () => {
      console.log(`Listening to port:${PORT}!`);
    });

    connectDB();
  } catch (error) {
    console.log(error);
  }
};

startServer();
