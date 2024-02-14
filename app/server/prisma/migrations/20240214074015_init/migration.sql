/*
  Warnings:

  - You are about to drop the column `instant` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `shippingFee` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `shippingId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `shippingName` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `OrderItem_orderId_storeId_shippingName_idx` ON `OrderItem`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `instant`,
    DROP COLUMN `shippingFee`,
    DROP COLUMN `shippingId`,
    DROP COLUMN `shippingName`;

-- CreateIndex
CREATE INDEX `OrderItem_orderId_storeId_idx` ON `OrderItem`(`orderId`, `storeId`);
