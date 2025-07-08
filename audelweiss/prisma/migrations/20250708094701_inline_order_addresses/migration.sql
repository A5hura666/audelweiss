/*
  Warnings:

  - Added the required column `billingCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCountry` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingLine1` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCountry` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLine1` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `billingCity` VARCHAR(191) NOT NULL,
    ADD COLUMN `billingCountry` VARCHAR(191) NOT NULL,
    ADD COLUMN `billingFirstName` VARCHAR(191) NULL,
    ADD COLUMN `billingLastName` VARCHAR(191) NULL,
    ADD COLUMN `billingLine1` VARCHAR(191) NOT NULL,
    ADD COLUMN `billingLine2` VARCHAR(191) NULL,
    ADD COLUMN `billingPostalCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingCity` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingCountry` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingFirstName` VARCHAR(191) NULL,
    ADD COLUMN `shippingLastName` VARCHAR(191) NULL,
    ADD COLUMN `shippingLine1` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingLine2` VARCHAR(191) NULL,
    ADD COLUMN `shippingPostalCode` VARCHAR(191) NOT NULL;
