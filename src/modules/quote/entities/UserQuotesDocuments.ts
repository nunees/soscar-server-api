export interface UserQuoteDocument{
  id: string;
  user_quote_id: string;
  document_type_id: number;
  document_url: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}