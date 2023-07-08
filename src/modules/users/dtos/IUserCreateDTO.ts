export interface IUserCreateDTO {
  id?: string;
  name: string;
  last_name: string;
  cpf: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  avatar?: string;
  gender?: string;
}
