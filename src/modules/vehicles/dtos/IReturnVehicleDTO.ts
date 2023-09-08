import { IBrandDTO } from "./IBrandDTO";

export interface IReturnVehicleDTO {
  user_id: string;
  brand: {
    icon: string;
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
