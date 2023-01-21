import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', false);

const app: Express = express();

const PORT = process.env.PORT || 3003;

app.use(cors());

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