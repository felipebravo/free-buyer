-- CreateTable
CREATE TABLE `Delivery` (
    `id` VARCHAR(36) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `delivery_date` TIMESTAMP(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
