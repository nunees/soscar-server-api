-- AlterTable
ALTER TABLE "user_schedules" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "partner_notes" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;
