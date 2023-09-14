export interface Location {
  id?: string;
  user_id?: string;
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
  business_description: string;
  active: boolean;
  open_hours: string;
  open_hours_weekend: string[];
  latitude: string | null;
  longitude: string | null;
  created_at?: Date;
  updated_at?: Date;
}
