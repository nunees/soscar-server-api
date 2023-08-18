-- CreateTable
CREATE TABLE "locations_categories" (
    "location_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "locations_categories_pkey" PRIMARY KEY ("location_id","category_id")
);

-- AddForeignKey
ALTER TABLE "locations_categories" ADD CONSTRAINT "locations_categories_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "business_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations_categories" ADD CONSTRAINT "locations_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "business_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
