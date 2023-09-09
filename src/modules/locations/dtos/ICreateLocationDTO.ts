export interface ICreateLocationDTO {
  user_id?: string | undefined;
  cnpj: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  address_line: string;
  number: number;
  city: string;
  district: string;
  state: string;
  zipcode: string;
  location_id?: string;
  payment_methods: number[];
  business_categories: number[];
  business_description: string | null;
  open_hours: string;
  open_hours_weekend: string[];
}
