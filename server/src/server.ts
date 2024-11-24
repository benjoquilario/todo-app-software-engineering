import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import auth from './routes/auth';
import todo from './routes/todo';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  // @ts-ignore
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', auth);
app.use('/todo', todo);

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
