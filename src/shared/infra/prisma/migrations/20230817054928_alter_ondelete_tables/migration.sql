-- DropForeignKey
ALTER TABLE "SystemLogs" DROP CONSTRAINT "SystemLogs_log_type_id_fkey";

-- DropForeignKey
ALTER TABLE "users_vehicles" DROP CONSTRAINT "users_vehicles_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "users_vehicles" DROP CONSTRAINT "users_vehicles_name_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles_names" DROP CONSTRAINT "vehicles_names_brand_id_fkey";

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicles_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "vehicles_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_names" ADD CONSTRAINT "vehicles_names_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicles_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemLogs" ADD CONSTRAINT "SystemLogs_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "LogsTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
