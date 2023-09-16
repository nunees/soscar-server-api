export interface IUpdateLocationDTO {
  user_id?: string;
  location_id?: string;
  cnpj?: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  address_line: string;
  number: number;
  city: string;
  district: string;
  state: string;
  zipcode: string;
  payment_methods: number[];
  business_categories: number[];
  business_description: string | null;
  cover_photo: string | null;
  avatar: string | null;
  open_hours: string;
  open_hours_weekend: string;
  latitude: string;
  longitude: string;
}
