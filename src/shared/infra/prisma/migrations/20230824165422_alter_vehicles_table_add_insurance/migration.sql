/*
  Warnings:

  - You are about to drop the column `isPrimary` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isPrimary";

-- AlterTable
ALTER TABLE "users_vehicles" ADD COLUMN     "insurance_id" INTEGER,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "engineMiles" DROP NOT NULL;
