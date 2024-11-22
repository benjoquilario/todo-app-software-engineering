import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { verifyJwt } from '../../lib/utils';
import db from '../../db';

export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyJwt(token);
    const user = await db.user.findUnique({
      where: {
        id: decoded.sub as string,
      },
    });

    if (!user) res.sendStatus(401);

    const accessToken = jwt.sign(
      {
        email: user?.email,
        sub: user?.id,
        name: user?.name,
      },
      process.env.AUTH_SECRET!,
      {
        expiresIn: '10h',
        algorithm: 'HS256',
      }
    );

    res.send({ accessToken, user });
  } catch (error) {
    res.sendStatus(400);
  }
};
