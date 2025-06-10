import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { folhaSchema } from '../validators/folhaSchema';

export const getFolhas = async (req: Request, res: Response): Promise<void> => {
  try {
    const folhas = await prisma.folhaCornell.findMany();
    res.status(200).json(folhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar folhas.' });
  }
};

export const getFolha = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const folha = await prisma.folhaCornell.findUnique({ where: { id } });

    if (!folha) {
      res.status(404).json({ error: 'Folha não encontrada.' });
      return;
    }

    res.status(200).json(folha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar folha.' });
  }
};

export const createFolha = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = folhaSchema.safeParse(req.body);

  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'Dados inválidos.', detalhes: parsed.error.errors });
    return;
  }

  try {
    const folha = await prisma.folhaCornell.create({
      data: parsed.data,
    });

    res.status(201).json(folha);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar folha.' });
  }
};

export const updateFolha = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const parsed = folhaSchema.safeParse(req.body);

  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'Dados inválidos.', detalhes: parsed.error.errors });
    return;
  }

  try {
    const folha = await prisma.folhaCornell.update({
      where: { id },
      data: parsed.data,
    });

    res.status(200).json(folha);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar folha.' });
  }
};

export const deleteFolha = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.folhaCornell.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar folha.' });
  }
};
