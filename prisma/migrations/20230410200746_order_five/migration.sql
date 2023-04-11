-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_delivery_id_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `is_accepted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `delivery_id` VARCHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_delivery_id_fkey` FOREIGN KEY (`delivery_id`) REFERENCES `Delivery`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
