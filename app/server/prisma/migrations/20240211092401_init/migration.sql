/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `ShippingStatus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ShippingStatus` DROP FOREIGN KEY `ShippingStatus_orderItemId_fkey`;

-- AlterTable
ALTER TABLE `ShippingStatus` DROP COLUMN `orderItemId`;
