import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';
import { comparePassword, hashPassword } from '../lib/utils';
import { credentialsValidators } from '../lib/validations/auth';

// @ts-expect-error
export const createUser: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const isEmailExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      },
    });

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// @ts-expect-error
export const login: RequestHandler = async (req, res) => {
  const validatedFiels = credentialsValidators.safeParse(req.body);

  try {
    if (validatedFiels.success) {
      const { email, password } = validatedFiels.data;

      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        return res.status(401).json({ message: 'Email does not exist' });

      const isPasswordCorrect = await comparePassword(
        password,
        user?.password!
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { sub: user?.id, name: user?.name },
        process.env.JWT_SECRET!,
        {
          expiresIn: '90d',
        }
      );

      res.cookie('token', token, {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      });

      res.redirect('http://localhost:5173');
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
