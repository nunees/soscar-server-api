
export interface IUpdateAssistanceOrderDTO{
  order_id: string;
  order_status: number;
  total_price: number;
  total_miles: number;
  latitude?: string;
  longitude?: string;
}