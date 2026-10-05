export interface ClientModel {
  id: string;
  name: string;
  cpf: string;
  address?: string | null;
  created_at: Date;
  updated_at: Date;
}
