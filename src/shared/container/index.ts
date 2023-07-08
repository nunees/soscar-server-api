import { container } from "tsyringe";

// In Memory repositories
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInMemory",
  UsersRepositoryInMemory
);

// container.register<PrismaClient>("PrismaClient", {
//   useValue: prisma,
// });
