/*
  Warnings:

  - The `open_hours_weekend` column on the `business_locations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "business_locations" DROP COLUMN "open_hours_weekend",
ADD COLUMN     "open_hours_weekend" TEXT[];
