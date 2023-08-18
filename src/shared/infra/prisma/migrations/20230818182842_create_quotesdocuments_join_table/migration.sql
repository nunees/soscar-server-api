-- CreateTable
CREATE TABLE "quotes_documents" (
    "quote_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "quotes_documents_pkey" PRIMARY KEY ("quote_id","document_id")
);

-- CreateIndex
CREATE INDEX "quotes_documents_quote_id_document_id_idx" ON "quotes_documents"("quote_id", "document_id");

-- AddForeignKey
ALTER TABLE "quotes_documents" ADD CONSTRAINT "quotes_documents_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "user_quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes_documents" ADD CONSTRAINT "quotes_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "user_quotes_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
