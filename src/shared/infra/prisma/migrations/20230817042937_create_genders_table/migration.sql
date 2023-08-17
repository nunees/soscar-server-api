/*
  Warnings:

  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "gender",
ADD COLUMN     "gendersId" INTEGER;

-- CreateTable
CREATE TABLE "UsersGenders" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "UsersGenders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersGenders_id_key" ON "UsersGenders"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_gendersId_fkey" FOREIGN KEY ("gendersId") REFERENCES "UsersGenders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
