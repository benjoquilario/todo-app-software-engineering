import db from '../db';
import { type Request, type Response } from 'express';
import { credentialsValidators } from '../lib/validations/auth';
import { comparePassword, hashPassword } from '../lib/utils';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const isEmailExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      res.status(409).json({ message: 'Email already exists' });
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      },
    });

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const validatedFiels = credentialsValidators.safeParse(req.body);

  try {
    if (validatedFiels.success) {
      const { email, password } = validatedFiels.data;

      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) res.status(401).json({ message: 'Email does not exist' });

      const isPasswordCorrect = await comparePassword(
        password,
        user?.password!
      );

      if (!isPasswordCorrect)
        res.status(401).json({ message: 'Invalid password' });

      // Generate token
      const token = jwt.sign(
        {
          email: user?.email,
          id: user?.id,
        },
        process.env.AUTH_SECRET!,
        {
          expiresIn: '10h',
          algorithm: 'HS256',
        }
      );

      res
        .status(200)
        .json({ message: 'Login successful', token, result: user });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
