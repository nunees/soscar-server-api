export interface Vehicle {
  id?: string;
  user_id: string;
  brand_id: number;
  name_id: number;
  color: string;
  year: number;
  plate: string;
  engineMiles: number;
  create_at: Date;
  updated_at: Date | null;
}
