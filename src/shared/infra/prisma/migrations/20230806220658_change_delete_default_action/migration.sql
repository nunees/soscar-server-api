/*
  Warnings:

  - The primary key for the `business_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `BusinessLocations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `business_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `business_services` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `business_categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `business_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category_id` on the `business_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BusinessLocations" DROP CONSTRAINT "BusinessLocations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "business_services" DROP CONSTRAINT "business_services_category_id_fkey";

-- DropForeignKey
ALTER TABLE "users_addresses" DROP CONSTRAINT "users_addresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_tokens" DROP CONSTRAINT "users_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "business_categories" DROP CONSTRAINT "business_categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "business_categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "business_services" DROP CONSTRAINT "business_services_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
DROP COLUMN "category_id",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD CONSTRAINT "business_services_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "BusinessLocations";

-- CreateTable
CREATE TABLE "business_locations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_phone" TEXT NOT NULL,
    "business_email" TEXT NOT NULL,
    "business_expertise" INTEGER[],
    "address_line" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_locations_user_id_cnpj_business_name_business_phon_idx" ON "business_locations"("user_id", "cnpj", "business_name", "business_phone", "business_email", "city", "state", "zipcode");

-- CreateIndex
CREATE UNIQUE INDEX "business_categories_id_key" ON "business_categories"("id");

-- CreateIndex
CREATE INDEX "business_categories_id_name_idx" ON "business_categories"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "business_services_id_key" ON "business_services"("id");

-- CreateIndex
CREATE INDEX "business_services_id_category_id_name_idx" ON "business_services"("id", "category_id", "name");

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_tokens" ADD CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_services" ADD CONSTRAINT "business_services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "business_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
