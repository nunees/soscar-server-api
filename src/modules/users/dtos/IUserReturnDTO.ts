export interface IUserReturnDTO {
  id?: string | undefined;
  name: string;
  last_name: string;
  mobile_phone: string;
  birth_date: Date;
  username: string;
  email: string;
  password: string;
  isPartner: boolean;
  avatar?: string;
  genero?: string;
}
