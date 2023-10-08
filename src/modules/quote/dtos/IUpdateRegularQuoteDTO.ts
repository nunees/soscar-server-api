export interface IUpdateRegularQuoteDTO {
  status: number;
  partner_notes: string;
  service_description: string;
  service_price: number;
  franchise_price?: number;
}