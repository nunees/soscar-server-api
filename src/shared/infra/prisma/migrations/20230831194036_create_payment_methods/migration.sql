-- AlterTable
ALTER TABLE "business_locations" ADD COLUMN     "paymentMethodsId" INTEGER;

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_id_key" ON "payment_methods"("id");

-- CreateIndex
CREATE INDEX "payment_methods_id_name_idx" ON "payment_methods"("id", "name");

-- AddForeignKey
ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_paymentMethodsId_fkey" FOREIGN KEY ("paymentMethodsId") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
