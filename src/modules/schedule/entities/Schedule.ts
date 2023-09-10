
export interface Schedule{
  id?: string;
  user_id: string;
  vehicle_id: string;
  service_type_id: number | null;
  location_id: string;
  date: Date;
  time: string;
  description?: string | null;
  status: number;
  partner_notes?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  location? : {
    id: string;
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
    created_at?: Date;
  }
  users?: {
    id: string;
    name: string;
    email: string;
  },
  service_type?: {
    id: number;
    name: string;
    description: string;
  },
  vehicle?: {
    id: string;
    user_id: string;
    vehicle_type_id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
  },
  UsersAddresses: {
    address_line: string;
    number: number;
    city: string;
    district: string;
    state: string;
    zipcode: string;
  },
  SchedulesFiles: {
    file_url: string;
  }
}