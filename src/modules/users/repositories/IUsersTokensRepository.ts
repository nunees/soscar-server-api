import { IUserTokenCreateDTO } from "../dtos/IUserTokenCreateDTO";
import { IUserTokenReturnDTO } from "../dtos/IUserTokenReturnDTO";

export interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
    code,
  }: IUserTokenCreateDTO): Promise<IUserTokenReturnDTO>;

  findByUserId(user_id: string): Promise<IUserTokenReturnDTO>;

  findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<IUserTokenReturnDTO>;

  findByRefreshToken(refresh_token: string): Promise<IUserTokenReturnDTO>;

  deleteById(id: string): Promise<void>;

}
