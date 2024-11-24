import express from 'express';
import { logout } from '../controllers/auth/logout';
import { refresh } from '../controllers/auth/refresh';
import { createUser, login } from '../controllers/user';

const router: express.Router = express.Router();

router.post('/register', createUser);
router.post('/refresh', refresh);
router.post('/login', login);
router.get('/logout', logout);

export default router;
