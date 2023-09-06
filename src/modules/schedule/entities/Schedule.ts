
export interface Schedule{
  id?: string;
  user_id: string;
  vehicle_id: string;
  service_type: string;
  location_id: string;
  date: Date;
  time: string;
  created_at?: Date;
  updated_at?: Date;
}