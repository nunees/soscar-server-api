type IRequest = {
  user_id: string;
  location_id: string;
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
};
export interface ILocationsRepository {
  create({
    user_id,
    cnpj,
    business_name,
    business_phone,
    business_email,
    business_expertise,
    address_line,
    number,
    city,
    district,
    state,
    zipcode,
  }: IRequest): Promise<void>;
  delete(location_id: string): Promise<void>;
  update({
    location_id,
    cnpj,
    business_name,
    business_phone,
    business_email,
    business_expertise,
    address_line,
    number,
    city,
    district,
    state,
    zipcode,
  }: IRequest): Promise<void>;
  findById(location_id: string): Promise<Location>;
  findAll(location_id: string): Promise<Location[]>;
}
