
export interface LegalQuoteDocument{
  id: string;
  document_url: string;
  isPartnerDocument: boolean;
  hash_id: string;
  created_at: Date | null;
  updated_at: Date | null;
}