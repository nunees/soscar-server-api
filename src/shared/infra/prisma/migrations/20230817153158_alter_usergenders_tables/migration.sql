/*
  Warnings:

  - You are about to drop the `UsersGenders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_gendersId_fkey";

-- DropTable
DROP TABLE "UsersGenders";

-- CreateTable
CREATE TABLE "users_genders" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_genders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_genders_id_key" ON "users_genders"("id");

-- CreateIndex
CREATE INDEX "users_genders_id_name_idx" ON "users_genders"("id", "name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_gendersId_fkey" FOREIGN KEY ("gendersId") REFERENCES "users_genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
