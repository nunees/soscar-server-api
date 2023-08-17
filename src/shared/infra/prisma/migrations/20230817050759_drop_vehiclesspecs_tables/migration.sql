/*
  Warnings:

  - You are about to drop the column `vehiclesSpecsId` on the `vehicles_names` table. All the data in the column will be lost.
  - You are about to drop the `vehicles_specs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles_names" DROP CONSTRAINT "vehicles_names_vehiclesSpecsId_fkey";

-- AlterTable
ALTER TABLE "vehicles_names" DROP COLUMN "vehiclesSpecsId";

-- DropTable
DROP TABLE "vehicles_specs";
