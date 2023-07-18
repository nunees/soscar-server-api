import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCaseInMemory } from "../../createUser/__test__/createUserUseCaseInMemory";
import { CreateAddressUseCaseInMemory } from "../../createAddress/__test__/CreateAddressUseCaseInMemory";
import { AddressesRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressesRepositoryInMemory";
import { User } from "@modules/users/entities/User";
import { IUserReturnDTO } from "@modules/users/dtos/IUserReturnDTO";

let createUserUseCaseInMemory: CreateUserUseCaseInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createAddressUseCaseInMemory: CreateAddressUseCaseInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

describe("Get User Addresses", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCaseInMemory = new CreateUserUseCaseInMemory(
      usersRepositoryInMemory
    );

    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createAddressUseCaseInMemory = new CreateAddressUseCaseInMemory(
      usersRepositoryInMemory,
      addressesRepositoryInMemory
    );
  });

  it("Should be able to get all user addresses", async () => {
    const user = await createUserUseCaseInMemory?.execute({
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

    const user_id = user.id as string;

    await createAddressUseCaseInMemory?.execute({
      user_id: String(user.id),
      address_line: "Rua tralala",
      number: 55,
      city: "Sao Bernardo do Campo",
      district: "Cooperativa",
      state: "Sao Paulo",
      zipcode: "654654654",
    });

    await createAddressUseCaseInMemory?.execute({
      user_id: String(user.id),
      address_line: "Rua patata",
      number: 5667,
      city: "Sao Bernardo do Campo",
      district: "Dos Casa",
      state: "Sao Paulo",
      zipcode: "43598304",
    });

    const addresses = await addressesRepositoryInMemory?.findAllAddresses(
      user_id
    );

    expect(addresses).toBeInstanceOf(Array);
    expect(addresses).toHaveLength(2);
    expect(addresses[0]).toHaveProperty("id");
  });
});
