/*
  Warnings:

  - Made the column `insuranceCompaniesId` on table `users_vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users_vehicles" DROP CONSTRAINT "users_vehicles_insuranceCompaniesId_fkey";

-- AlterTable
ALTER TABLE "users_vehicles" ALTER COLUMN "insuranceCompaniesId" SET NOT NULL,
ALTER COLUMN "insuranceCompaniesId" SET DEFAULT 12;

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_insuranceCompaniesId_fkey" FOREIGN KEY ("insuranceCompaniesId") REFERENCES "insurance_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
