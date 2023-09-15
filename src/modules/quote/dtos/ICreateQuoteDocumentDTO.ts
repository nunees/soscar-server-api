export interface ICreateQuoteDocumentDTO {
  hashId: string;
  user_quote_id: string;
  document_type_id?: number | null;
  document_url: string | null;
}