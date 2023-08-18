-- CreateTable
CREATE TABLE "user_quotes_documents" (
    "id" TEXT NOT NULL,
    "user_quote_id" TEXT NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "document_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_quotes_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "documents_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_quotes_documents_user_quote_id_document_type_id_idx" ON "user_quotes_documents"("user_quote_id", "document_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_types_id_key" ON "documents_types"("id");

-- CreateIndex
CREATE INDEX "documents_types_id_name_idx" ON "documents_types"("id", "name");

-- AddForeignKey
ALTER TABLE "user_quotes_documents" ADD CONSTRAINT "user_quotes_documents_user_quote_id_fkey" FOREIGN KEY ("user_quote_id") REFERENCES "user_quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes_documents" ADD CONSTRAINT "user_quotes_documents_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "documents_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
