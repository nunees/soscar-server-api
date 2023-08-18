/*
  Warnings:

  - You are about to drop the column `service_id` on the `user_quotes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_quotes" DROP CONSTRAINT "user_quotes_service_id_fkey";

-- AlterTable
ALTER TABLE "user_quotes" DROP COLUMN "service_id",
ADD COLUMN     "businessServicesId" INTEGER;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_businessServicesId_fkey" FOREIGN KEY ("businessServicesId") REFERENCES "business_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
