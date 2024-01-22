/*
  Warnings:

  - You are about to drop the column `pritority` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `pritority`,
    ADD COLUMN `priority` INTEGER NOT NULL DEFAULT 0;
