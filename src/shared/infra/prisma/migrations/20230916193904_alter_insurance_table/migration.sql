/*
  Warnings:

  - Added the required column `icon` to the `insurance_companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "insurance_companies" ADD COLUMN     "icon" TEXT NOT NULL;
