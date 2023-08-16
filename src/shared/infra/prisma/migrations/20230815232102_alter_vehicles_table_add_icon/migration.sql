/*
  Warnings:

  - Added the required column `icon` to the `vehicles_brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles_brands" ADD COLUMN     "icon" TEXT NOT NULL;
