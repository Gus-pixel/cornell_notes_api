export type UserType = 'gratuito' | 'premium';

export interface UserDTO {
  nome: string;
  email: string;
  senha: string;
  tipo: UserType;
}
