/*
  Warnings:

  - Made the column `insurance_id` on table `users_vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users_vehicles" ALTER COLUMN "insurance_id" SET NOT NULL;
