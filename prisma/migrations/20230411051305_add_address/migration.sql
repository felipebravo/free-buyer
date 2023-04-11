-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(36) NOT NULL,
    `zip_code` VARCHAR(8) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `district` VARCHAR(200) NOT NULL,
    `street` VARCHAR(200) NOT NULL,
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
