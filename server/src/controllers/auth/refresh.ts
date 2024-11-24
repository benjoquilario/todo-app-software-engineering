import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { verifyJwt } from '../../lib/utils';

// @ts-ignore
export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies?.token;

  console.log(token);

  if (!token)
    return res
      .status(401)
      .json({ error: 'Refresh token does not exist or has expired already.' });

  try {
    const decoded = verifyJwt(token);

    const user = await db.user.findUnique({
      where: {
        id: decoded.sub as string,
      },
    });

    if (!user) return res.sendStatus(401);

    const accessToken = jwt.sign(
      { sub: user.id, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    return res.send({ accessToken, user });
  } catch (error) {
    res.sendStatus(400);
  }
};
