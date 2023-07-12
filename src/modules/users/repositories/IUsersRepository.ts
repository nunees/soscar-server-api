import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";

export interface IUsersRepository {
  create({
    id,
    name,
    last_name,
    cpf,
    mobile_phone,
    birth_date,
    username,
    email,
    password,
  }: IUserCreateDTO): Promise<IUserReturnDTO>;
  isUserPartner(user_id: string, isPartner: boolean): Promise<boolean>;
  findByCPF(cpf: string): Promise<IUserReturnDTO | null>;
  findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO | null>;
  findByUsername(username: string): Promise<IUserReturnDTO | null>;
  findByEmail(email: string): Promise<IUserReturnDTO | null>;
  findById(user_id: string): Promise<IUserReturnDTO | null>;
}
