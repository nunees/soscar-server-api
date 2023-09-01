-- AlterTable
ALTER TABLE "business_locations" ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
