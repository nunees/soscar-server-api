-- CreateTable
CREATE TABLE "locations_photos" (
    "id" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "locations_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "locations_photos_id_location_id_idx" ON "locations_photos"("id", "location_id");

-- AddForeignKey
ALTER TABLE "locations_photos" ADD CONSTRAINT "locations_photos_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "business_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
