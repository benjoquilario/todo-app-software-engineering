import { RequestHandler } from 'express';
import { verifyJwt } from './lib/utils';

// @ts-expect-error
const verifyLogin: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers?.['authorization'];

  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);

      try {
        const payload = verifyJwt(token);

        res.locals.userId = payload.sub;
      } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

export default verifyLogin;
