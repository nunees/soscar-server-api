import { container } from "tsyringe";

import "@shared/container/providers";

import { AddressesRepository } from "@modules/users/infra/prisma/repositories/AddressesRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/users/infra/prisma/repositories/UsersTokensRepository";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";

// In memory Repositories
// container.registerSingleton<IUsersRepository>(
//   "UsersRepositoryInMemory",
//   UsersRepositoryInMemory
// );

// container.registerSingleton<IAddressRepository>(
//   "AddressesRepositoryInMemory",
//   AddressesRepositoryInMemory
// );

// Database repositories
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAddressRepository>(
  "AddressesRepository",
  AddressesRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.register<PrismaClient>("PrismaClient", {
  useValue: prisma,
});
