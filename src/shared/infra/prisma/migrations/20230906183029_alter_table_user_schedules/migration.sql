/*
  Warnings:

  - Changed the type of `time` on the `user_schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "business_locations" ADD COLUMN     "open_hours" TEXT,
ADD COLUMN     "open_hours_weekend" TEXT[];

-- AlterTable
ALTER TABLE "user_schedules" DROP COLUMN "time",
ADD COLUMN     "time" TIME NOT NULL;

-- CreateIndex
CREATE INDEX "user_schedules_user_id_vehicle_id_service_type_id_date_time_idx" ON "user_schedules"("user_id", "vehicle_id", "service_type_id", "date", "time");
