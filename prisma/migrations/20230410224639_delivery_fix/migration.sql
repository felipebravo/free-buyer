/*
  Warnings:

  - You are about to drop the column `status` on the `delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `status`,
    ADD COLUMN `is_delivered` BOOLEAN NOT NULL DEFAULT false;
