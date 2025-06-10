import { Request, Response } from 'express';
import { userSchema } from '../validators/userSchema';
import { prisma } from '../prisma/prisma';
import bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map(({ senha, ...user }) => user);
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const { senha, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'Dados inválidos.', detalhes: parsed.error.errors });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(parsed.data.senha, 10);

    const user = await prisma.user.create({
      data: {
        ...parsed.data,
        senha: hashedPassword,
      },
    });

    const { senha, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'Dados inválidos.', detalhes: parsed.error.errors });
    return;
  }

  try {
    let updatedData = { ...parsed.data };

    if (parsed.data.senha) {
      const hashedPassword = await bcrypt.hash(parsed.data.senha, 10);
      updatedData.senha = hashedPassword;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    const { senha, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar usuário.' });
  }
};
