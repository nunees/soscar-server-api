import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { CreateAddressUseCase } from "../createAddress/CreateAddressUseCase";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementation/DayJsDateProvider";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createAddressUseCase: CreateAddressUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

let dayJsDateProvider: DayJsDateProvider;

describe("Get User Addresses", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    dayJsDateProvider = new DayJsDateProvider();

    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      usersRepositoryInMemory,
      addressesRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("Should be able to get all user addresses", async () => {
    const user = await createUserUseCase?.execute({
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
      user_id: String(user.id),
      address_line: "Rua tralala",
      number: 55,
      city: "Sao Bernardo do Campo",
      district: "Cooperativa",
      state: "Sao Paulo",
      zipcode: "654654654",
    });

    await createAddressUseCase?.execute({
      user_id: String(user.id),
      address_line: "Rua patata",
      number: 5667,
      city: "Sao Bernardo do Campo",
      district: "Dos Casa",
      state: "Sao Paulo",
      zipcode: "43598304",
    });

    const addresses = await addressesRepositoryInMemory?.findAllAddresses(
      String(user.id)
    );

    expect(addresses).toBeInstanceOf(Array);
    expect(addresses).toHaveLength(2);
    expect(addresses[0]).toHaveProperty("id");
  });
});
