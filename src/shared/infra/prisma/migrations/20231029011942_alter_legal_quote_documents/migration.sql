/*
  Warnings:

  - You are about to drop the column `userLegalQuotesId` on the `business_locations` table. All the data in the column will be lost.
  - You are about to drop the column `quote_id` on the `legal_quote_documents` table. All the data in the column will be lost.
  - You are about to drop the column `insurance_type_id` on the `user_legal_quotes` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `user_legal_quotes` table. All the data in the column will be lost.
  - Added the required column `hash_id` to the `legal_quote_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `user_legal_quotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business_locations" DROP CONSTRAINT "business_locations_userLegalQuotesId_fkey";

-- DropForeignKey
ALTER TABLE "legal_quote_documents" DROP CONSTRAINT "legal_quote_documents_quote_id_fkey";

-- DropForeignKey
ALTER TABLE "user_legal_quotes" DROP CONSTRAINT "user_legal_quotes_insurance_type_id_fkey";

-- DropIndex
DROP INDEX "legal_quote_documents_quote_id_idx";

-- AlterTable
ALTER TABLE "business_locations" DROP COLUMN "userLegalQuotesId";

-- AlterTable
ALTER TABLE "legal_quote_documents" DROP COLUMN "quote_id",
ADD COLUMN     "hash_id" TEXT NOT NULL,
ADD COLUMN     "userLegalQuotesId" TEXT;

-- AlterTable
ALTER TABLE "user_legal_quotes" DROP COLUMN "insurance_type_id",
DROP COLUMN "locations",
ADD COLUMN     "insuranceTypesId" INTEGER,
ADD COLUMN     "location_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "legal_quote_documents_hash_id_id_idx" ON "legal_quote_documents"("hash_id", "id");

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "business_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_insuranceTypesId_fkey" FOREIGN KEY ("insuranceTypesId") REFERENCES "insurance_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_quote_documents" ADD CONSTRAINT "legal_quote_documents_userLegalQuotesId_fkey" FOREIGN KEY ("userLegalQuotesId") REFERENCES "user_legal_quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
