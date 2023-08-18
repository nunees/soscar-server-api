/*
  Warnings:

  - You are about to drop the `locations_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "locations_categories" DROP CONSTRAINT "locations_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "locations_categories" DROP CONSTRAINT "locations_categories_location_id_fkey";

-- DropTable
DROP TABLE "locations_categories";

-- CreateTable
CREATE TABLE "locations_business_categories" (
    "id" TEXT NOT NULL,
    "business_location" TEXT NOT NULL,
    "business_category" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "locations_business_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "locations_business_categories_business_location_business_ca_idx" ON "locations_business_categories"("business_location", "business_category");

-- AddForeignKey
ALTER TABLE "locations_business_categories" ADD CONSTRAINT "locations_business_categories_business_location_fkey" FOREIGN KEY ("business_location") REFERENCES "business_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations_business_categories" ADD CONSTRAINT "locations_business_categories_business_category_fkey" FOREIGN KEY ("business_category") REFERENCES "business_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
