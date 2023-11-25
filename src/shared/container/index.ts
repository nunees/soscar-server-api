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
import { GendersRepository } from "@modules/users/infra/prisma/repositories/GendersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { VehiclesRepository } from "@modules/vehicles/infra/prisma/repositories/VehiclesRepository";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { QuotesRepository } from "@modules/quote/infra/prisma/repositories/QuotesRepository";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { SchedulesRepository } from "@modules/schedule/infra/prisma/SchedulesRepository";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementation/DayJsDateProvider";
import { ILegalQuoteRepository } from "@modules/quote/repositories/ILegalQuoteRepository";
import { LegalQuotesRepository } from "@modules/quote/infra/prisma/repositories/LegalQuotesRespository";
import { IReviewsRepository } from "@modules/review/repositories/IReviewsRepository";
import { ReviewsRepository } from "@modules/review/infra/prisma/repositories/ReviewsRepository";
import { INotificationsRepository } from "@modules/notifications/repositories/INotificationsRepository";
import { NotificationsRepository } from "@modules/notifications/infra/prisma/NotificationsRepository";
import { IPasswordResetsRepository } from "@modules/users/repositories/IPasswordResetsRepository";
import { PasswordResetsRepository } from "@modules/users/infra/prisma/repositories/PasswordResetsRepository";
import { AssistanceStatusRepository } from "@modules/assistance/infra/prisma/AssistancesStatusRepository";
import { IAssistanceOrdersRepository } from "@modules/assistance/repositories/IAssistanceOrdersRepository";
import { AssistanceOrdersRepository } from "@modules/assistance/infra/prisma/AssistanceOrdersRepository";
import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository";

// In memory Repositories
// container.registerSingleton<IUsersRepository>(
//   "UsersRepositoryInMemory",
//   UsersRepositoryInMemory
// );

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
  GendersRepository
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

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayJsDateProvider
)

container.register<PrismaClient>("PrismaClient", {
  useValue: prisma,
});

container.register<ISchedulesRepository>(
  "SchedulesRepository",
  SchedulesRepository
)

container.registerSingleton<ILegalQuoteRepository>(
  "LegalQuotesRepository",
  LegalQuotesRepository
)

container.registerSingleton<IReviewsRepository>(
  "ReviewsRepository",
  ReviewsRepository
)

container.registerSingleton<INotificationsRepository>(
  "NotificationsRepository",
  NotificationsRepository
)

container.registerSingleton<IPasswordResetsRepository>(
  "PasswordResetsRepository",
  PasswordResetsRepository
)

container.registerSingleton<IAssistanceStatusRepository>(
  "AssistanceStatusRepository",
  AssistanceStatusRepository
)

container.registerSingleton<IAssistanceOrdersRepository>(
  "AssistanceOrdersRepository",
  AssistanceOrdersRepository
)
