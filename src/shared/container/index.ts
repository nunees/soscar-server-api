import { container } from "tsyringe";

// In Memory repositories
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";

// In memory Repositories
container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInMemory",
  UsersRepositoryInMemory
);

container.registerSingleton<IAddressRepository>(
  "AddressesRepositoryInMemory",
  AddressesRepositoryInMemory
);

// Database repositories
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.register<PrismaClient>("PrismaClient", {
  useValue: prisma,
});
