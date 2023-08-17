export interface IUpdateLocationDTO {
  cnpj?: string;
  business_name: string;
  business_phone: string;
  business_email: string;
  business_expertise: number[];
  address_line: string;
  number: number;
  city: string;
  district: string;
  state: string;
  zipcode: string;
}
