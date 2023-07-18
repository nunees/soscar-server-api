import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayJsDateProvider";
import { v4 as uuid } from "uuid";
import { AuthenticateUserUseCaseInMemory } from "./AuthenticateUserUseCaseInMemory";
import { CreateUserUseCaseInMemory } from "../../createUser/__test__/createUserUseCaseInMemory";

let createUserUseCaseInMemory: CreateUserUseCaseInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;

let authenticateUserUseCaseInMemory: AuthenticateUserUseCaseInMemory;

describe("Authenticate user test", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCaseInMemory = new CreateUserUseCaseInMemory(
      usersRepositoryInMemory
    );
    authenticateUserUseCaseInMemory = new AuthenticateUserUseCaseInMemory(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able to authenticate a user", async () => {
    const user = await createUserUseCaseInMemory?.execute({
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

    const session = await authenticateUserUseCaseInMemory?.execute({
      email: user.email,
      password: "casaamarela",
    });

    expect(session).toHaveProperty("token");
  });
});
