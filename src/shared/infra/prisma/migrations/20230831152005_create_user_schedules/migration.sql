-- AlterTable
ALTER TABLE "user_quotes" ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "user_schedules" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "service_type_id" INTEGER,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_schedules_user_id_vehicle_id_service_type_id_date_time_idx" ON "user_schedules"("user_id", "vehicle_id", "service_type_id", "date", "time");

-- AddForeignKey
ALTER TABLE "user_schedules" ADD CONSTRAINT "user_schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schedules" ADD CONSTRAINT "user_schedules_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schedules" ADD CONSTRAINT "user_schedules_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "business_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
