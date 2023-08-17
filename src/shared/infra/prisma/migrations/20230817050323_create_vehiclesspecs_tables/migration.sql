-- AlterTable
ALTER TABLE "vehicles_names" ADD COLUMN     "vehiclesSpecsId" INTEGER;

-- CreateTable
CREATE TABLE "vehicles_specs" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vehicles_specs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_specs_id_key" ON "vehicles_specs"("id");

-- CreateIndex
CREATE INDEX "vehicles_specs_id_description_idx" ON "vehicles_specs"("id", "description");

-- AddForeignKey
ALTER TABLE "vehicles_names" ADD CONSTRAINT "vehicles_names_vehiclesSpecsId_fkey" FOREIGN KEY ("vehiclesSpecsId") REFERENCES "vehicles_specs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
