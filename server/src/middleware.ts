import { RequestHandler } from 'express';
import { verifyJwt } from './lib/utils';

const verifyLogin: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers?.['authorization'];

  if (authHeader) {
    if (authHeader.startsWith('Bearer')) {
      const token = authHeader.slice(5);

      try {
        const payload = verifyJwt(token);

        res.locals.userId = payload.sub;
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

export default verifyLogin;
