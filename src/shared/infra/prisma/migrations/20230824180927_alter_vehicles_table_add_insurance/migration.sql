-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_insurance_id_fkey" FOREIGN KEY ("insurance_id") REFERENCES "insurance_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
