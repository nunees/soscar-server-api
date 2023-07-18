interface IRequest {
  user_id?: String;
  cnpj: String;
  business_name: String;
  business_phone: String;
  business_email: String;
  business_expertise: Number[];
  address_line: String;
  number: Number;
  city: String;
  district: String;
  state: String;
  zipcode: String;
}

export interface ILocationsRepository {
  create(): Promise<void>;
}
