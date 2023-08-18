/*
  Warnings:

  - You are about to drop the column `insurance_value` on the `user_quotes` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `user_quotes` table. All the data in the column will be lost.
  - You are about to drop the column `service_value` on the `user_quotes` table. All the data in the column will be lost.
  - Added the required column `service_price` to the `user_quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_quotes" DROP COLUMN "insurance_value",
DROP COLUMN "notes",
DROP COLUMN "service_value",
ADD COLUMN     "franchise_price" DOUBLE PRECISION,
ADD COLUMN     "partner_notes" TEXT,
ADD COLUMN     "service_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "user_notes" TEXT,
ALTER COLUMN "insurance_type_id" DROP NOT NULL,
ALTER COLUMN "insurance_company_id" DROP NOT NULL;
