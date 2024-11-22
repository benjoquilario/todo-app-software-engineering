import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { corsConfig } from './config/cors';
// import bodyParser from 'body-parser';
// import session from 'express-session';

import auth from './routes/auth';
import todo from './routes/todo';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', auth);
app.use('/todo', todo);

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
