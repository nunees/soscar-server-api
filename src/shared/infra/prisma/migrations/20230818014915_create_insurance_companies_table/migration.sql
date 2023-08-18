-- CreateTable
CREATE TABLE "insurance_companies" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "insurance_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "insurance_companies_id_key" ON "insurance_companies"("id");

-- CreateIndex
CREATE INDEX "insurance_companies_id_name_idx" ON "insurance_companies"("id", "name");
