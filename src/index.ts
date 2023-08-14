import express from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';

import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes());
app.use(notFound);
app.use(errorHandler);
//app.get('/', (req, res) => res.send('Server is ready'));
app.listen(port, () => console.log(`server started successfully on ${port}`));
