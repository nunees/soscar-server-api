import { container } from "tsyringe";

import "@shared/container/providers";

import { AddressesRepository } from "@modules/users/infra/prisma/repositories/AddressesRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/users/infra/prisma/repositories/UsersTokensRepository";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";
import { ILocationsRepository } from "@modules/locations/repositories/ILocationsRepository";
import { LocationsRepository } from "@modules/locations/infra/prisma/repositories/LocationsRepository";
import { IGendersRepository } from "@modules/users/repositories/IGendersRepository";
import { GendersReposotory } from "@modules/users/infra/prisma/repositories/GendersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { VehiclesRepository } from "@modules/vehicles/infra/prisma/repositories/VehiclesRepository";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { QuotesRepository } from "@modules/quote/infra/prisma/repositories/QuotesRepository";

// In memory Repositories
container.registerSingleton<IUsersRepository>(
  "UsersRepositoryInMemory",
  UsersRepositoryInMemory
);

container.registerSingleton<IAddressRepository>(
  "AddressesRepositoryInMemory",
  AddressesRepositoryInMemory
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepositoryInMemory",
  UsersTokensRepository
);

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

container.registerSingleton<IGendersRepository>(
  "GendersRepository",
  GendersReposotory
);

container.registerSingleton<ILocationsRepository>(
  "LocationsRepository",
  LocationsRepository
);

container.registerSingleton<IVehiclesRepository>(
  "VehiclesRepository",
  VehiclesRepository
);

container.registerSingleton<IQuotesRepository>(
  "QuotesRepository",
  QuotesRepository
);

container.register<PrismaClient>("PrismaClient", {
  useValue: prisma,
});
