import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma/prisma';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    const { senha: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
