/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `assistance_status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "assistance_status_user_id_key" ON "assistance_status"("user_id");
