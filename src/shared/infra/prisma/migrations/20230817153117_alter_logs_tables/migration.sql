/*
  Warnings:

  - You are about to drop the `LogsTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SystemLogs" DROP CONSTRAINT "SystemLogs_log_type_id_fkey";

-- DropTable
DROP TABLE "LogsTypes";

-- DropTable
DROP TABLE "SystemLogs";

-- CreateTable
CREATE TABLE "system_logs" (
    "id" TEXT NOT NULL,
    "log_type_id" INTEGER NOT NULL,
    "path" TEXT DEFAULT 'none',
    "log" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "system_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "logs_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "system_logs_id_log_type_id_path_idx" ON "system_logs"("id", "log_type_id", "path");

-- CreateIndex
CREATE UNIQUE INDEX "logs_types_id_key" ON "logs_types"("id");

-- CreateIndex
CREATE INDEX "logs_types_id_name_idx" ON "logs_types"("id", "name");

-- AddForeignKey
ALTER TABLE "system_logs" ADD CONSTRAINT "system_logs_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "logs_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
