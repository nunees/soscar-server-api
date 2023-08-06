import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayJsDateProvider";
import { v4 as uuid } from "uuid";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate user test", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able to authenticate a user", async () => {
    await createUserUseCase?.execute({
      id: uuid(),
      name: "Felipe",
      last_name: "da Silva",
      cpf: "00000000000",
      birth_date: new Date("1993-07-01"),
      mobile_phone: "11999999999",
      email: "felipe@test.com",
      username: "felipe3446",
      password: "casaamarela",
      isPartner: false,
    });

    const session = await authenticateUserUseCase?.execute({
      email: "felipe@test.com",
      password: "casaamarela",
    });

    expect(session.user).toHaveProperty("id");
    expect(session).toHaveProperty("token");
  });
});
