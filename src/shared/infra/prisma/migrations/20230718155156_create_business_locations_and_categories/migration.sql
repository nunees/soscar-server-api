-- CreateTable
CREATE TABLE "BusinessLocations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_phone" TEXT NOT NULL,
    "business_email" TEXT NOT NULL,
    "address_line" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "BusinessLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_services" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_categories_id_name_idx" ON "business_categories"("id", "name");

-- CreateIndex
CREATE INDEX "business_services_id_category_id_name_idx" ON "business_services"("id", "category_id", "name");

-- AddForeignKey
ALTER TABLE "BusinessLocations" ADD CONSTRAINT "BusinessLocations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_services" ADD CONSTRAINT "business_services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "business_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
