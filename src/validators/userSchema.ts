import { z } from 'zod';

export const userSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string(),
  tipo: z.enum(['gratuito', 'premium']).default('premium'),
});
