import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/users/infra/prisma/repositories/UsersTokensRepository";
import { PrismaClient } from "@prisma/client";
import { AppError } from "@errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const prismaCLient = new PrismaClient();
  const usersTokensRepository = new UsersTokensRepository(prismaCLient);

  if (!authHeader) {
    throw new AppError("token.missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const user = await usersTokensRepository.findByUserId(user_id as string);

    if (!user) throw new AppError("Usuário não existe!", 401);

    request.user = {
      id: user_id as string,
    };

    return next();
  } catch {
    throw new AppError("Usuário não autorizado", 401);
  }
}
