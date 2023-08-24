export interface Vehicle {
  id?: string;
  user_id: string;
  brand_id: number;
  name_id: number;
  color: string | null;
  year: number;
  plate: string | null;
  engineMiles: number | null;
  insurance_id: number | null;
  create_at: Date | null;
  updated_at: Date | null;
}
