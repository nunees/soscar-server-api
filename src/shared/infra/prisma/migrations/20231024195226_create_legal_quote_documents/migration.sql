-- CreateTable
CREATE TABLE "legal_quote_documents" (
    "id" TEXT NOT NULL,
    "quote_id" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "isPartnerDocument" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "legal_quote_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "legal_quote_documents_quote_id_idx" ON "legal_quote_documents"("quote_id");

-- AddForeignKey
ALTER TABLE "legal_quote_documents" ADD CONSTRAINT "legal_quote_documents_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "user_legal_quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
