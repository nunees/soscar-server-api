export interface IUpdateAssistanceStatusDTO{
  id: string;
  service_id: number;
  milesFee: number;
  price: number;
  busy?: boolean;
  latitude: string;
  longitude: string;
}