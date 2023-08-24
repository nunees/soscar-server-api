/*
  Warnings:

  - You are about to drop the column `insurance_id` on the `users_vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_vehicles" DROP CONSTRAINT "users_vehicles_insurance_id_fkey";

-- AlterTable
ALTER TABLE "users_vehicles" DROP COLUMN "insurance_id",
ADD COLUMN     "insuranceCompaniesId" INTEGER;

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_insuranceCompaniesId_fkey" FOREIGN KEY ("insuranceCompaniesId") REFERENCES "insurance_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
