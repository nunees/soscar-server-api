import { LegalQuote } from "../entities/LegalQuote";
import { LegalQuoteDocument } from "../entities/LegalQuoteDocument";


type IRequest = {
  user_id: string;
  hashId: string;
  vehicle_id: string;
  insurance_type_id: number;
  insurance_company_id: number;
  service_type_id: number;
  user_notes: string;
  location_id: string;
};

export interface ILegalQuoteRepository {
  create(quote: IRequest): Promise<LegalQuote>
  createQuoteDocument(hashId: string, document_url: string, isPartner: boolean ): Promise<LegalQuoteDocument>
  findById(id: string): Promise<LegalQuote>
  findByHashId(user_id: string, hashId: string): Promise<LegalQuote[]>
  findAllUserLegalQuotes(user_id: string): Promise<LegalQuote[]>
  findAllLegalQuotes(): Promise<LegalQuote[]>
  findAllByLocation(location_id: string): Promise<LegalQuote[]>
  updateStatus(quote_id: string, quote_status: number): Promise<void>
  updateLegalQuote(quote_id: string, franchise_price: number, service_price: number, service_description: string, partner_notes: string, status: number):Promise<void>
  findQuoteDocuments(hashId: string): Promise<LegalQuoteDocument[]>
  fetchDocument(hashId: string, document_id: string): Promise<string>
  updateDocumentOwner(document_id: string): Promise<void>
}