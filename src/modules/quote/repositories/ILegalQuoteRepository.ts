import { LegalQuote } from "../entities/LegalQuote";


type IRequest = {
  user_id: string;
  hashId: string;
  vehicle_id: string;
  insurance_type_id: number;
  insurance_company_id: number;
  service_type_id: number;
  user_notes: string;
  locations: string[];
};

export interface ILegalQuoteRepository {
  create(quote: IRequest): Promise<LegalQuote>
  createQuoteDocument(quote_id: string, document_url: string, isPartner: boolean ): Promise<void>
  findById(id: string): Promise<LegalQuote>
}