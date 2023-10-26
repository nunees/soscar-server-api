-- AlterTable
ALTER TABLE "business_locations" ADD COLUMN     "userLegalQuotesId" TEXT;

-- CreateTable
CREATE TABLE "user_legal_quotes" (
    "id" TEXT NOT NULL,
    "hashId" TEXT NOT NULL,
    "is_juridical" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "insurance_type_id" INTEGER,
    "insurance_company_id" INTEGER,
    "service_type_id" INTEGER,
    "franchise_price" DOUBLE PRECISION,
    "service_price" DOUBLE PRECISION,
    "service_decription" TEXT,
    "user_notes" TEXT,
    "partner_notes" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_legal_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_legal_quotes_id_key" ON "user_legal_quotes"("id");

-- CreateIndex
CREATE INDEX "user_legal_quotes_id_user_id_vehicle_id_hashId_idx" ON "user_legal_quotes"("id", "user_id", "vehicle_id", "hashId");

-- AddForeignKey
ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_userLegalQuotesId_fkey" FOREIGN KEY ("userLegalQuotesId") REFERENCES "user_legal_quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_insurance_type_id_fkey" FOREIGN KEY ("insurance_type_id") REFERENCES "insurance_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_insurance_company_id_fkey" FOREIGN KEY ("insurance_company_id") REFERENCES "insurance_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_legal_quotes" ADD CONSTRAINT "user_legal_quotes_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "business_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
