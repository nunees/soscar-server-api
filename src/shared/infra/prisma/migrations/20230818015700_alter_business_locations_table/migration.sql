/*
  Warnings:

  - You are about to drop the column `business_expertise` on the `business_locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "business_locations" DROP COLUMN "business_expertise",
ADD COLUMN     "business_categories" INTEGER[],
ADD COLUMN     "business_description" TEXT,
ADD COLUMN     "payment_methods" INTEGER[];
