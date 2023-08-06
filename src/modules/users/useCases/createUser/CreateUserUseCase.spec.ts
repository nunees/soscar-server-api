import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { v4 as uuid } from "uuid";
import { CreateUserUseCase } from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create user test", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = {
      id: uuid(),
      name: "Maria",
      last_name: "da Silva",
      cpf: "00000000111",
      birth_date: new Date("1993-07-01"),
      mobile_phone: "11999999111",
      email: "felipe1@test.com",
      username: "felipe3000",
      password: "casaamarela",
      isPartner: false,
    };

    const response = await createUserUseCase.execute(user);

    expect(response).toHaveProperty("id");
  });

  it("Should be able to create a new partner user", async () => {
    const user = {
      id: uuid(),
      name: "Amanda",
      last_name: "da Silva",
      cpf: "00000000222",
      birth_date: new Date("1993-07-01"),
      mobile_phone: "11999999222",
      email: "felipe2@test.com",
      username: "felipe3001",
      password: "casaamarela",
      isPartner: true,
    };

    const response = await createUserUseCase.execute(user);

    expect(response).toHaveProperty("id");
  });

  it("Should not be able to create a new user with same CPF, mobile phone, email, or username fields", async () => {
    expect(async () => {
      await createUserUseCase?.execute({
        id: uuid(),
        name: "João",
        last_name: "de Andrade",
        cpf: "00000000333",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999333",
        email: "felipe3@test.com",
        username: "felipe3568",
        password: "casaamarela",
        isPartner: false,
      });

      await createUserUseCase?.execute({
        id: uuid(),
        name: "Megan",
        last_name: "Jones",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999555",
        email: "felipe3@test.com",
        username: "felipe3871",
        password: "casaamarela",
        isPartner: false,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
