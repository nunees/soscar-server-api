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
  findByCPF(cpf: string): Promise<IUserReturnDTO>;
  findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO>;
  findByUsername(username: string): Promise<IUserReturnDTO>;
  findByEmail(email: string): Promise<IUserReturnDTO>;
}
