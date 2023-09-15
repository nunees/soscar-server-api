/*
  Warnings:

  - Added the required column `location_id` to the `user_quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_quotes" ADD COLUMN     "location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "business_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
