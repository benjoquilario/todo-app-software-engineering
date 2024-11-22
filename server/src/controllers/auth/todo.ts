import { RequestHandler, type Request, type Response } from 'express';
import db from '../../db';

export const getUserTodos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.userId as string;
    const todos = await db.todo.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json({ data: todos });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  const { content } = req.body;

  const userId = res.locals.userId as string;

  try {
    const create = await db.todo.create({
      data: {
        content,
        title: '',
        userId,
      },
    });

    res
      .status(200)
      .json({ message: 'Todo created successfully', data: create });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await db.todo.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
