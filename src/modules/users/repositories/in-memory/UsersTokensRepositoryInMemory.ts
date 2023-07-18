import { IUserTokenCreateDTO } from "@modules/users/dtos/IUserTokenCreateDTO";
import { IUserTokenReturnDTO } from "@modules/users/dtos/IUserTokenReturnDTO";
import { Tokens } from "@modules/users/entities/Tokens";
import { v4 as uuid } from "uuid";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  tokens: Tokens[] = [];

  constructor() {
    this.tokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUserTokenCreateDTO): Promise<IUserTokenReturnDTO> {
    const token = {
      id: uuid(),
      user_id,
      refresh_token,
      expires_date,
      created_at: new Date(),
    };

    this.tokens.push(token);

    return token as IUserTokenReturnDTO;
  }

  async findByUserId(user_id: string): Promise<IUserTokenReturnDTO> {
    const token = this.tokens.find((token) => token.user_id === user_id)!;
    return token as IUserTokenReturnDTO;
  }

  async findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<IUserTokenReturnDTO> {
    const token = this.tokens.find(
      (token) => token.user_id === id && token.refresh_token === refresh_token
    )!;
    return token as IUserTokenReturnDTO;
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<IUserTokenReturnDTO> {
    const token = this.tokens.find(
      (token) => token.refresh_token === refresh_token
    )!;
    return token as IUserTokenReturnDTO;
  }

  async deleteById(id: string): Promise<void> {
    const token = this.tokens.find((token) => token.id === id)!;
    this.tokens.splice(this.tokens.indexOf(token));
  }
}
