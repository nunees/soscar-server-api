import { ICreatePasswordRecoverDTO } from "../dtos/ICreatePasswordRecoverDTO";
import { PasswordReset } from "../entities/PasswordReset";

export interface IPasswordResetsRepository {
  create(data: ICreatePasswordRecoverDTO): Promise<PasswordReset>;
  findByUserIdAndCode(user_id: string, code: string): Promise<PasswordReset>;
  delete(id: string): Promise<void>;
}