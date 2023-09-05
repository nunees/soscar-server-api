import { IBrandDTO } from "./IBrandDTO";

export interface IReturnVehicleDTO {
  user_id: string;
  brand: {
    name: string;
    id: number;
  };
  name: {
    name: string;
    id: number;
  };
  color: string | null;
  year: number;
  plate?: string | null;
  engineMiles: number | null;
}
