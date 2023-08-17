-- CreateTable
CREATE TABLE "SystemLogs" (
    "id" TEXT NOT NULL,
    "log_type_id" INTEGER NOT NULL,
    "log" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SystemLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogsTypes" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "LogsTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogsTypes_id_key" ON "LogsTypes"("id");

-- AddForeignKey
ALTER TABLE "SystemLogs" ADD CONSTRAINT "SystemLogs_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "LogsTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
