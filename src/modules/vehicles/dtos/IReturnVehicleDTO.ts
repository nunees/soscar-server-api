import { IBrandDTO } from "./IBrandDTO";

export interface IReturnVehicleDTO {
  user_id: string;
  brand: IBrandDTO;
  name_id: number;
  color: string | null;
  year: number;
  plate?: string | null;
  engineMiles: number | null;
}
