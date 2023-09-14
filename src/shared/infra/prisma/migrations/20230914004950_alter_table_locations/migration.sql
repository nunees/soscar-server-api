/*
  Warnings:

  - You are about to drop the column `read` on the `messages` table. All the data in the column will be lost.
  - Added the required column `receiver_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropIndex
DROP INDEX "messages_id_sender_id_idx";

-- AlterTable
ALTER TABLE "business_locations" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "read",
ADD COLUMN     "receiver_id" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "messages_id_sender_id_receiver_id_idx" ON "messages"("id", "sender_id", "receiver_id");
