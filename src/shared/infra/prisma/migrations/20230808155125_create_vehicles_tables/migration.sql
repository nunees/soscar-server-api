-- CreateTable
CREATE TABLE "users_vehicles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "name_id" INTEGER NOT NULL,
    "color" TEXT,
    "year" INTEGER NOT NULL,
    "plate" TEXT,
    "engineMiles" BIGINT DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_brands" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vehicles_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_names" (
    "id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vehicles_names_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_vehicles_plate_key" ON "users_vehicles"("plate");

-- CreateIndex
CREATE INDEX "users_vehicles_user_id_brand_id_name_id_year_plate_idx" ON "users_vehicles"("user_id", "brand_id", "name_id", "year", "plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_brands_id_key" ON "vehicles_brands"("id");

-- CreateIndex
CREATE INDEX "vehicles_brands_id_name_idx" ON "vehicles_brands"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_names_id_key" ON "vehicles_names"("id");

-- CreateIndex
CREATE INDEX "vehicles_names_id_brand_id_name_idx" ON "vehicles_names"("id", "brand_id", "name");

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicles_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_vehicles" ADD CONSTRAINT "users_vehicles_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "vehicles_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_names" ADD CONSTRAINT "vehicles_names_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicles_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
