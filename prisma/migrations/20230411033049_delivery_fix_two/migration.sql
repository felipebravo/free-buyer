/*
  Warnings:

  - You are about to drop the column `delivery_id` on the `order` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_delivery_id_fkey`;

-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `order_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `delivery_id`;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
