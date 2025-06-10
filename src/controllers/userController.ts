import { Request, Response } from 'express';

import { userSchema } from '../validators/userSchema';
import { prisma } from '../prisma/prisma';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
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
    const user = await prisma.user.create({ data: parsed.data });
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
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
    const user = await prisma.user.update({
      where: { id },
      data: parsed.data,
    });
    res.status(200).json(user);
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
