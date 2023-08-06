-- DropIndex
DROP INDEX "users_addresses_user_id_city_state_zipcode_idx";

-- CreateIndex
CREATE INDEX "users_addresses_user_id_city_state_zipcode_id_idx" ON "users_addresses"("user_id", "city", "state", "zipcode", "id");
