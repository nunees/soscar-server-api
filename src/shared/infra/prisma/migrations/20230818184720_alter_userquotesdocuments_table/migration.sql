/*
  Warnings:

  - The `document_url` column on the `user_quotes_documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_quotes_documents" DROP COLUMN "document_url",
ADD COLUMN     "document_url" TEXT[];
