-- CreateTable
CREATE TABLE "schedules_files" (
    "id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "schedules_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "schedules_files_schedule_id_idx" ON "schedules_files"("schedule_id");

-- AddForeignKey
ALTER TABLE "schedules_files" ADD CONSTRAINT "schedules_files_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "user_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
