import { Address } from "@modules/users/entities/Address";
import { User } from "@modules/users/entities/User";
import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { v4 as uuid } from "uuid";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createAddressUseCase: CreateAddressUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

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
  isPartner: false,
  created_at: new Date(),
};

describe("Create user address test", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCase = new CreateAddressUseCase(
      addressesRepositoryInMemory
    );

    await createUserUseCase.execute(user);
  });

  it("Should be able to create a new address", async () => {
    const address: Address = {
      id: uuid(),
      user_id: user.id!,
      address_line: "Rua tralala",
      number: 55,
      city: "Sao Bernardo do Campo",
      district: "Cooperativa",
      state: "Sao Paulo",
      zipcode: "654654654",
      created_at: new Date(),
    };

    const result = await createAddressUseCase.execute(address);

    console.log(result);

    expect(result).toHaveProperty("user_id");
    expect(result).toHaveProperty("address_line");
    expect(result.number).toEqual(55);
  });
});
