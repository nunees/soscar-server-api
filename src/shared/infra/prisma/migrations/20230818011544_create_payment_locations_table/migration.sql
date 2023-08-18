/*
  Warnings:

  - The primary key for the `locations_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `locations_categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "locations_categories" DROP CONSTRAINT "locations_categories_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "locations_categories_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "locations_categories_location_id_category_id_idx" ON "locations_categories"("location_id", "category_id");
