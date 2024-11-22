import express from 'express';
import { createTodo, getUserTodos } from '../controllers/auth/todo';
import verifyLogin from '../middleware';

const router: express.Router = express.Router();
router.use(verifyLogin);

router.post('/create', verifyLogin, createTodo);
router.get('/user/todos', verifyLogin, getUserTodos);

export default router;
