// import { NextFunction, Request, Response } from "express";
// import { verify } from "jsonwebtoken";

// import { CustomersTokensRepository } from "@modules/accounts/customers/infra/prisma/repositories/CustomersTokensRepository";
// import { PrismaClient } from "@prisma/client";
// import { AppError } from "@shared/errors/AppError";

// interface IPayload {
//   sub: string;
// }

// export async function ensureCustomerAuthenticated(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   const authHeader = request.headers.authorization;
//   const prismaClient = new PrismaClient();
//   const customersTokensRepository = new CustomersTokensRepository(prismaClient);

//   if (!authHeader) {
//     throw new AppError("Usuário não autenticado", 401);
//   }

//   const [, token] = authHeader.split(" ");

//   try {
//     const { sub: id } = verify(token, process.env.JWT_SECRET) as IPayload;

//     const customer =
//       await customersTokensRepository.findByCustomerIdAndRefreshToken(
//         id,
//         token
//       );

//     if (!customer) {
//       throw new AppError("Usuário não existe", 401);
//     }

//     request.customer = {
//       id,
//     };

//     return next();
//   } catch (error) {
//     throw new AppError("Token invalido", 401);
//   }
// }
