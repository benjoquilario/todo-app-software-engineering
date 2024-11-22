import express from 'express';
import { createUser, login } from '../controllers/user';
import { refresh } from '../controllers/auth/refresh';
import { logout } from '../controllers/auth/logout';

const router: express.Router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.post('/refresh', refresh);
router.get('/logout', logout);

export default router;
