import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { v4 as uuid } from "uuid";
import { CreateUserUseCase } from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create user suite test", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user: User = {
      id: uuid(),
      name: "Felipe",
      last_name: "da Silva",
      cpf: "00000000000",
      birth_date: new Date("1993-07-01"),
      mobile_phone: "11999999999",
      email: "felipe@test.com",
      username: "felipe3446",
      password: "casaamarela",
      created_at: new Date(),
    };

    const result = await createUserUseCase.execute(user);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("email");
  });

  it("Should not be able to create a new user with same cpf", async () => {
    expect(async () => {
      await usersRepositoryInMemory.create({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        created_at: new Date(),
      });

      await usersRepositoryInMemory.create({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        created_at: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with same mobile number", async () => {
    expect(async () => {
      await usersRepositoryInMemory.create({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        created_at: new Date(),
      });

      await usersRepositoryInMemory.create({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        created_at: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
