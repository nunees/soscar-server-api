import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { v4 as uuid } from "uuid";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { CreateAddressUseCase } from "./CreateAddressUseCase";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayJsDateProvider";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createAddressUseCase: CreateAddressUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

let dayJsDateProvider: DayJsDateProvider;

describe("Create address test", () => {
  beforeEach(() => {
    dayJsDateProvider = new DayJsDateProvider();

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      usersRepositoryInMemory,
      addressesRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("Should be able to create a new address", async () => {
    const user_id = uuid();

    expect(async () => {
      await createUserUseCase.execute({
        id: user_id,
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

      await createAddressUseCase?.execute({
        user_id: user_id,
        address_line: "Rua tralala",
        number: 55,
        city: "Sao Bernardo do Campo",
        district: "Cooperativa",
        state: "Sao Paulo",
        zipcode: "654654654",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new regular address if user is a partner", async () => {
    expect(async () => {
      const user = {
        name: "Jose",
        last_name: "da Silva",
        cpf: "00000000222",
        birth_date: new Date("1993-07-01"),
        mobile_phone: "11999999333",
        email: "felipe333@test.com",
        username: "felipe3446333",
        password: "casaamarela",
        isPartner: true,
        created_at: new Date(),
      };

      const new_user = await createUserUseCase.execute(user);

      const address = {
        user_id: String(new_user.id),
        address_line: "Rua tralala",
        number: 55,
        city: "Sao Bernardo do Campo",
        district: "Cooperativa",
        state: "Sao Paulo",
        zipcode: "654654654",
        created_at: new Date(),
      };

      await createAddressUseCase.execute(address);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new address if user does not exist", async () => {
    expect(async () => {
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

      await createAddressUseCase?.execute({
        user_id: uuid(),
        address_line: "Rua tralala",
        number: 55,
        city: "Sao Bernardo do Campo",
        district: "Cooperativa",
        state: "Sao Paulo",
        zipcode: "654654654",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new address if user id is not provided", async () => {
    expect(async () => {
      const address = {
        user_id: "",
        address_line: "Rua tralala",
        number: 55,
        city: "Sao Bernardo do Campo",
        district: "Cooperativa",
        state: "Sao Paulo",
        zipcode: "654654654",
        created_at: new Date(),
      };

      await createAddressUseCase.execute(address);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new address if address line is not provided", async () => {
    expect(async () => {
      const new_user = await createUserUseCase.execute({
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

      await createAddressUseCase.execute({
        user_id: String(new_user.id),
        address_line: "",
        number: 55,
        city: "Sao Bernardo do Campo",
        district: "Cooperativa",
        state: "Sao Paulo",
        zipcode: "654654654",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});