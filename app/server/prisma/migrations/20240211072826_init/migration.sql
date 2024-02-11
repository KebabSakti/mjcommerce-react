/*
  Warnings:

  - The values [COMPLETE] on the enum `ShippingStatus_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETE] on the enum `ShippingStatus_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETE] on the enum `ShippingStatus_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `productVariantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productVariantName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productVariantPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `productVariantId` VARCHAR(191) NOT NULL,
    ADD COLUMN `productVariantName` VARCHAR(191) NOT NULL,
    ADD COLUMN `productVariantPrice` DECIMAL(19, 4) NOT NULL,
    ADD COLUMN `productVariantUnit` VARCHAR(191) NULL,
    ADD COLUMN `wholesaleMin` INTEGER NULL,
    ADD COLUMN `wholesalePrice` DECIMAL(19, 4) NULL,
    MODIFY `productUnit` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `OrderStatus` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `PaymentStatus` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `ShippingStatus` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING';
