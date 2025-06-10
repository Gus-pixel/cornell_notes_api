import { z } from 'zod';

export const folhaSchema = z.object({
  usuarioId: z.string().uuid(),
  materia: z.string().optional(),
  titulo: z.string().optional(),
  resumo: z.string().optional(),
  palavras_chave: z.array(z.string()).optional(),
  anotacoes_relevantes: z.array(z.string()).optional(),
  cores_personalizadas: z.any().optional(),
});
