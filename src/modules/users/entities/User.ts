export interface User {
  id?: string;
  name: string;
  last_name: string;
  cpf: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  email: string;
  password: string;
  isPartner: boolean;
  created_at?: Date;
  updated_at?: Date;
  avatar: string;
  gender?: string;
}
