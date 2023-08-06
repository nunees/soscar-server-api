import auth from "@config/auth";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    username: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository?.findByEmail(email);

    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    // Verify password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError(message.EmailOrPasswordIncorrect, 401);
    }

    // Generate token
    const token = sign({}, secret_token, {
      subject: user.id as string,
      expiresIn: expires_in_token,
    });

    // Generate refresh token
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id as string,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider?.addDays(
      expires_refresh_token_days
    );

    await this.usersTokensRepository?.create({
      user_id: user.id as string,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      user: {
        id: user.id as string,
        name: user.name,
        username: user.username,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}
