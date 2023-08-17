/*
  Warnings:

  - You are about to drop the column `gendersId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_gendersId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "gendersId",
ADD COLUMN     "genderId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "users_genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
