
export interface ICreateSchedule{
  id?: string;
  user_id: string;
  vehicle_id: string;
  location_id: string;
  service_type: number;
  date: Date;
  time: string;
  notes: string;
  status?: number | null;
}