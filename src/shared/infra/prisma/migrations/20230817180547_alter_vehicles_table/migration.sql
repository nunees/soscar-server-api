/*
  Warnings:

  - You are about to alter the column `engineMiles` on the `users_vehicles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `engineMiles` on table `users_vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users_vehicles" ALTER COLUMN "engineMiles" SET NOT NULL,
ALTER COLUMN "engineMiles" SET DATA TYPE INTEGER;
