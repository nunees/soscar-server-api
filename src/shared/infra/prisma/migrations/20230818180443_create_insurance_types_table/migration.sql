-- CreateTable
CREATE TABLE "insurance_types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "insurance_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "insurance_types_id_key" ON "insurance_types"("id");

-- CreateIndex
CREATE INDEX "insurance_types_id_name_idx" ON "insurance_types"("id", "name");
