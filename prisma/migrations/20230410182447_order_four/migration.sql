-- AlterTable
ALTER TABLE `product` ADD COLUMN `order_id` VARCHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
