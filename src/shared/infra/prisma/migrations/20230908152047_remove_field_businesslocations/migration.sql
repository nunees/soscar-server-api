/*
  Warnings:

  - You are about to drop the column `photos` on the `business_locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "business_locations" DROP COLUMN "photos",
ALTER COLUMN "open_hours_weekend" SET NOT NULL,
ALTER COLUMN "open_hours_weekend" SET DATA TYPE TEXT;
