-- CreateTable
CREATE TABLE "user_quotes" (
    "id" TEXT NOT NULL,
    "is_juridical" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "insurance_type_id" INTEGER NOT NULL,
    "insurance_company_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "service_type_id" INTEGER NOT NULL,
    "insurance_value" DOUBLE PRECISION NOT NULL,
    "service_value" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_quotes_user_id_vehicle_id_insurance_type_id_insurance__idx" ON "user_quotes"("user_id", "vehicle_id", "insurance_type_id", "insurance_company_id");

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_insurance_type_id_fkey" FOREIGN KEY ("insurance_type_id") REFERENCES "insurance_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_insurance_company_id_fkey" FOREIGN KEY ("insurance_company_id") REFERENCES "insurance_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "business_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "business_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
