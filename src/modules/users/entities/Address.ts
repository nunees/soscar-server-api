export interface Address {
  id?: string;
  user_id: string;
  address_line: string;
  number: number;
  district: string;
  city: string;
  state: string;
  zipcode: string;
  created_at: Date;
  updated_at?: Date;
}
