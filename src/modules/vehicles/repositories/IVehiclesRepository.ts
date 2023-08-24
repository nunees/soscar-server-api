import { ICreateVehicleDTO } from "../dtos/ICreateVehicleDTO";
import { IInsuranceDTO } from "../dtos/IInsuranceDTO";
import { IListAllBrands } from "../dtos/IListAllBrands";
import { IListAllVehiclesNamesDTO } from "../dtos/IListAllVehiclesNamesDTO";
import { IReturnVehicleDTO } from "../dtos/IReturnVehicleDTO";

export interface IVehiclesRepository {
  create(vehicle: ICreateVehicleDTO): Promise<void>;
  delete(vehicle_id: string): Promise<void>;
  fetchAll(user_id: string): Promise<IReturnVehicleDTO[]>;
  findById(vehicle_id: string): Promise<IReturnVehicleDTO>;
  update(vehicle: ICreateVehicleDTO): Promise<void>;
  listAllBrands(): Promise<IListAllBrands[]>;
  listAllVehiclesNames(): Promise<IListAllVehiclesNamesDTO[]>;
  listAllInsurances(): Promise<IInsuranceDTO[]>;
  findModelNameById(brand_id: number): Promise<IListAllVehiclesNamesDTO[]>;
  findFavoriteCar(user_id: string): Promise<IReturnVehicleDTO[]>;
}
