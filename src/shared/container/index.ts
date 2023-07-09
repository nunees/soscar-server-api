import { container } from "tsyringe";

// In Memory repositories
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInMemory",
  UsersRepositoryInMemory
);

container.registerSingleton<IAddressRepository>(
  "AddressesRepositoryInMemory",
  AddressesRepositoryInMemory
);

// container.register<PrismaClient>("PrismaClient", {
//   useValue: prisma,
// });
