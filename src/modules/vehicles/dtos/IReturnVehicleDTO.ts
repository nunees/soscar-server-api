export interface IReturnVehicleDTO {
  user_id: string;
  brand_id: number;
  name_id: number;
  color: string | null;
  year: number;
  plate?: string | null;
  engineMiles: number | null;
}
