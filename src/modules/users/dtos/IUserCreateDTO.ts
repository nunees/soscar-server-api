export interface IUserCreateDTO {
  id?: string;
  name: string;
  last_name: string;
  cpf: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  email: string;
  password?: string;
  isPartner?: boolean;
  avatar?: string | null;
  genderId?: number;
}
