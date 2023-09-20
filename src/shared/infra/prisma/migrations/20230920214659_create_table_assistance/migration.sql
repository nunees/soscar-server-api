-- AlterTable
ALTER TABLE "user_quotes" ADD COLUMN     "assistanceStatusId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isAssistance" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "assistance_status" (
    "id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "category_id" INTEGER NOT NULL,
    "business_services_id" INTEGER NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "milesFee" DOUBLE PRECISION DEFAULT 0,
    "price" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "assistance_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assistance_status_id_key" ON "assistance_status"("id");

-- CreateIndex
CREATE INDEX "assistance_status_id_user_id_category_id_business_services__idx" ON "assistance_status"("id", "user_id", "category_id", "business_services_id", "latitude", "longitude");

-- AddForeignKey
ALTER TABLE "assistance_status" ADD CONSTRAINT "assistance_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistance_status" ADD CONSTRAINT "assistance_status_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "business_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistance_status" ADD CONSTRAINT "assistance_status_business_services_id_fkey" FOREIGN KEY ("business_services_id") REFERENCES "business_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quotes" ADD CONSTRAINT "user_quotes_assistanceStatusId_fkey" FOREIGN KEY ("assistanceStatusId") REFERENCES "assistance_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
