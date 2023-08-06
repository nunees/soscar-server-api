import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";
import { User } from "../entities/User";

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
  updateAvatar(user_id: string, avatar_file: string): Promise<void>;
  isUserPartner(user_id: string, isPartner: boolean): Promise<Boolean>;
  findByCPF(cpf: string): Promise<IUserReturnDTO>;
  findByMobilePhone(mobile_phone: string): Promise<IUserReturnDTO>;
  findByUsername(username: string): Promise<IUserReturnDTO>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<IUserReturnDTO>;
  delete(user_id: string): Promise<void>;
}
