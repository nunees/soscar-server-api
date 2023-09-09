
export interface Schedule{
  id?: string;
  user_id: string;
  vehicle_id: string;
  service_type_id: number | null;
  location_id: string;
  date: Date;
  time: string;
  notes?: string | null;
  status? : number | null;
  partner_notes?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}