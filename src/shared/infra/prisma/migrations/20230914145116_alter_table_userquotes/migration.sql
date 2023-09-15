/*
  Warnings:

  - You are about to drop the column `photos` on the `user_quotes` table. All the data in the column will be lost.
  - Added the required column `hashId` to the `user_quotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashId` to the `user_quotes_documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_quotes_documents_user_quote_id_document_type_id_idx";

-- AlterTable
ALTER TABLE "user_quotes" DROP COLUMN "photos",
ADD COLUMN     "hashId" TEXT NOT NULL,
ADD COLUMN     "service_decription" TEXT;

-- AlterTable
ALTER TABLE "user_quotes_documents" ADD COLUMN     "hashId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "user_quotes_documents_user_quote_id_document_type_id_hashId_idx" ON "user_quotes_documents"("user_quote_id", "document_type_id", "hashId");
