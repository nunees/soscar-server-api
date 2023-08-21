/*
  Warnings:

  - You are about to drop the column `note` on the `users_vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_vehicles" DROP COLUMN "note",
ADD COLUMN     "notes" TEXT;
