/*
  Warnings:

  - You are about to drop the column `code` on the `users_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_tokens" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "assistance_orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "assistance_status_id" TEXT NOT NULL,
    "order_status" INTEGER NOT NULL DEFAULT 1,
    "total_price" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "usersId" TEXT,

    CONSTRAINT "assistance_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assistance_orders_id_user_id_assistance_status_id_order_sta_idx" ON "assistance_orders"("id", "user_id", "assistance_status_id", "order_status");

-- AddForeignKey
ALTER TABLE "assistance_orders" ADD CONSTRAINT "assistance_orders_assistance_status_id_fkey" FOREIGN KEY ("assistance_status_id") REFERENCES "assistance_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistance_orders" ADD CONSTRAINT "assistance_orders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
