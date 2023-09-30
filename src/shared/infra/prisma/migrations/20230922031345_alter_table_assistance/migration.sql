/*
  Warnings:

  - The primary key for the `assistance_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `business_services_id` on the `assistance_status` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `assistance_status` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `assistance_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assistance_status" DROP CONSTRAINT "assistance_status_business_services_id_fkey";

-- DropForeignKey
ALTER TABLE "assistance_status" DROP CONSTRAINT "assistance_status_category_id_fkey";

-- DropForeignKey
ALTER TABLE "user_quotes" DROP CONSTRAINT "user_quotes_assistanceStatusId_fkey";

-- DropIndex
DROP INDEX "assistance_status_id_key";

-- DropIndex
DROP INDEX "assistance_status_id_user_id_category_id_business_services__idx";

-- AlterTable
ALTER TABLE "assistance_status" DROP CONSTRAINT "assistance_status_pkey",
DROP COLUMN "business_services_id",
DROP COLUMN "category_id",
ADD COLUMN     "businessCategoriesId" INTEGER,
ADD COLUMN     "businessServicesId" INTEGER,
ADD COLUMN     "service_id" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "assistance_status_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_quotes" ALTER COLUMN "assistanceStatusId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "assistance_status_id_user_id_latitude_longitude_idx" ON "assistance_status"("id", "user_id", "latitude", "longitude");

-- AddForeignKey
ALTER TABLE "assistance_status" ADD CONSTRAINT "assistance_status_businessCategoriesId_fkey" FOREIGN KEY ("businessCategoriesId") REFERENCES "business_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistance_status" ADD CONSTRAINT "assistance_status_businessServicesId_fkey" FOREIGN KEY ("businessServicesId") REFERENCES "business_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_assistanceStatusId_fkey" FOREIGN KEY ("assistanceStatusId") REFERENCES "assistance_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
