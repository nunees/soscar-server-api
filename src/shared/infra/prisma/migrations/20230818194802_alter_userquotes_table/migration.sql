/*
  Warnings:

  - You are about to drop the column `businessServicesId` on the `user_quotes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_quotes" DROP CONSTRAINT "user_quotes_businessServicesId_fkey";

-- DropForeignKey
ALTER TABLE "user_quotes" DROP CONSTRAINT "user_quotes_service_type_id_fkey";

-- AlterTable
ALTER TABLE "user_quotes" DROP COLUMN "businessServicesId",
ADD COLUMN     "businessCategoriesId" INTEGER;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "business_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_businessCategoriesId_fkey" FOREIGN KEY ("businessCategoriesId") REFERENCES "business_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
