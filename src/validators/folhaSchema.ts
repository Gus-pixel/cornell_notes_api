import { z } from 'zod';

export const folhaSchema = z.object({
  usuarioId: z.string().uuid(),
  materia: z.string().optional().default(''),
  titulo: z.string().optional().default(''),
  resumo: z.string().optional().default(''),
  palavras_chave: z.array(z.string()).optional().default([]),
  anotacoes_relevantes: z.array(z.string()).optional().default([]),
  cores_personalizadas: z.any().optional().default(null),
});
