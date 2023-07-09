/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersAddresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersAddresses" DROP CONSTRAINT "UsersAddresses_user_id_fkey";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "UsersAddresses";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "mobile_phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "birthDate" TEXT,
    "gender" TEXT DEFAULT 'none',
    "isTermsAccepted" BOOLEAN DEFAULT false,
    "isAccountVerified" BOOLEAN DEFAULT false,
    "isAccountLocked" BOOLEAN DEFAULT false,
    "isPartner" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_addresses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "address_line" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_phone_key" ON "users"("mobile_phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_cpf_username_email_idx" ON "users"("cpf", "username", "email");

-- CreateIndex
CREATE INDEX "users_addresses_user_id_city_state_zipcode_idx" ON "users_addresses"("user_id", "city", "state", "zipcode");

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
