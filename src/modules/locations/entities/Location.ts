export class Location {
  id?: String;
  user_id?: String;
  cnpj: String;
  business_name: String;
  business_phone: String;
  business_email: String;
  address_line: String;
  number: Number;
  city: String;
  district: String;
  state: String;
  zipcode: String;
  location_id?: string;
  payment_methods: number[];
  business_categories: number[];
  business_description: string;
  created_at?: Date;
  updated_at?: Date;
}
