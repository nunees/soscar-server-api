export interface QuotesDocument{
  quote_id: string;
  document_id?: string;
  created_at: Date | null;
  updated_at: Date | null;
}