-- AlterTable
ALTER TABLE "user_quotes_documents" ALTER COLUMN "document_url" DROP NOT NULL,
ALTER COLUMN "document_url" DROP DEFAULT,
ALTER COLUMN "document_url" SET DATA TYPE TEXT;
