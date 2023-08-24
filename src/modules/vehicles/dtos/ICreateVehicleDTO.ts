export interface ICreateVehicleDTO {
  id?: string | null;
  user_id: string;
  brand_id: number;
  name_id: number;
  color?: string | null;
  year: number;
  plate?: string | null;
  engineMiles?: number | null;
  insurance_id?: number | undefined;
  notes?: string | null;
  photo?: string | null;
  isPrimary?: boolean | false;
}
