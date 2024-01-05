import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute(token: string) {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("token.invalid");
    }

    // Delete old token
    await this.usersTokensRepository.deleteById(String(userToken.id));

    // Generate a new token
    const expires_date = this.dayJsDateProvider.addDays(
      auth.expires_refresh_token_days
    );

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_refresh_token_days,
    });

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}
