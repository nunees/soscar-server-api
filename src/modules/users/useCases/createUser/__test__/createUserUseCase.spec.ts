import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { v4 as uuid } from "uuid";
import { CreateUserUseCaseInMemory } from "./createUserUseCaseInMemory";

let createUserUseCase: CreateUserUseCaseInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create user test", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCaseInMemory(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase?.execute({
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
    });

    expect(user).toHaveProperty("email");
  });

  it("Should be able to create a new partner user", async () => {
    expect(async () => {
      await createUserUseCase?.execute({
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
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with same CPF", async () => {
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

  it("Should not be able to create a new user with same mobile number", async () => {
    expect(async () => {
      await createUserUseCase?.execute({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000001",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        isPartner: false,
        created_at: new Date(),
      });

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
        created_at: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with same username", async () => {
    expect(async () => {
      await createUserUseCase?.execute({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000001",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        isPartner: false,
      });

      await createUserUseCase?.execute({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999998",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        isPartner: false,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a user with same email", async () => {
    expect(async () => {
      await createUserUseCase?.execute({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000001",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999999",
        email: "felipe@test.com",
        username: "felipe2020",
        password: "casaamarela",
        isPartner: false,
      });

      await createUserUseCase?.execute({
        id: uuid(),
        name: "Felipe",
        last_name: "da Silva",
        cpf: "00000000000",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999998",
        email: "felipe@test.com",
        username: "felipe3446",
        password: "casaamarela",
        isPartner: false,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // /**
  //  * TODO: Implementar testes para CPF inválido
  //  */
  // it("Should not be able to create a user with invalid CPF", async () => {});

  // /**
  //  * TODO: Implementar testes para numero de celular inválido
  //  */
  // it("Should not be able to create a user with invalid mobile number", async () => {});

  // /**
  //  * TODO: Implementar testes para data de nascimento inválida
  //  */
  // it("Should not be able to create a user with invalid birth date", async () => {});

  // /**
  //  * TODO: Implementar testes para email inválido
  //  */
  // it("Should not be able to create a user with invalid email", async () => {});

  // /**
  //  * TODO: Implementar testes para username inválido
  //  */
  // it("Should not be able to create a user with invalid username", async () => {});

  // /**
  //  * TODO: Implementar testes para senha inválida
  //  */
  // it("Should not be able to create a user with invalid password", async () => {});

  // /**
  //  * TODO: Implementar testes para isPartner inválido
  //  */
  // it("Should not be able to create a user with invalid isPartner", async () => {});
});
