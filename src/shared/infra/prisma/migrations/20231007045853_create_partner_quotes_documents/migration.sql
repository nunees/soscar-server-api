-- AlterTable
ALTER TABLE "quotes_documents" ADD COLUMN     "partnerQuotesDocumentsId" TEXT;

-- CreateTable
CREATE TABLE "partner_quotes_documents" (
    "id" TEXT NOT NULL,
    "hashId" TEXT NOT NULL,
    "quote_id" TEXT NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "document_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "partner_quotes_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partner_quotes_documents_quote_id_document_type_id_hashId_idx" ON "partner_quotes_documents"("quote_id", "document_type_id", "hashId");

-- AddForeignKey
ALTER TABLE "quotes_documents" ADD CONSTRAINT "quotes_documents_partnerQuotesDocumentsId_fkey" FOREIGN KEY ("partnerQuotesDocumentsId") REFERENCES "partner_quotes_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_quotes_documents" ADD CONSTRAINT "partner_quotes_documents_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "user_quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_quotes_documents" ADD CONSTRAINT "partner_quotes_documents_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "documents_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
