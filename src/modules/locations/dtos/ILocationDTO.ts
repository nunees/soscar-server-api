export interface ILocationDTO {
  id?: string;
  location_id?: string;
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
  payment_methods: number[];
  business_categories: number[];
  business_description: string | null | undefined;
  LocationsPhotos?: {
    id?: string;
    location_id?: string | null;
    photo: string;
    created_at: Date | null;
    updated_at: Date | null;
  }[];
  users?:{
    id?: string;
    name: string;
    email: string;
    avatar: string;
  }
  open_hours: string | null;
  open_hours_weekend: string;
  active: boolean;
}
