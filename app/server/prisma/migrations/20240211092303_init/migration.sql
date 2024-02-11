-- DropForeignKey
ALTER TABLE `ShippingStatus` DROP FOREIGN KEY `ShippingStatus_orderItemId_fkey`;

-- AlterTable
ALTER TABLE `ShippingStatus` MODIFY `orderItemId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ShippingStatus` ADD CONSTRAINT `ShippingStatus_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
