import { RequestHandler } from 'express';

export const logout: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  res.clearCookie('refreshToken', { httpOnly: true, path: '/auth/refresh' });
  res.sendStatus(200);
};
