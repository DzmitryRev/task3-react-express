import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './router';
import errorMiddleware from './middlewares/error-mw';

dotenv.config();
mongoose.set('strictQuery', false);

const app: Express = express();

const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL).catch((error: Error) => {
      throw new Error(error.message);
    });
    app.listen(PORT, () => {
      console.log(`Server is running. PORT=${PORT}`);
    });
  } catch (error) {
    console.log(error, 'a');
  }
};

start();
