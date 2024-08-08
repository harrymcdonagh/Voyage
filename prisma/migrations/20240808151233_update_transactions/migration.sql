/*
  Warnings:

  - You are about to drop the column `coin_name` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `purchased_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `watchlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coinAmount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinName` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinPrice` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinSymbol` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `watchlist_user_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `coin_name`,
    DROP COLUMN `price`,
    DROP COLUMN `purchased_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `coinAmount` DOUBLE NOT NULL,
    ADD COLUMN `coinName` VARCHAR(191) NOT NULL,
    ADD COLUMN `coinPrice` DOUBLE NOT NULL,
    ADD COLUMN `coinSymbol` VARCHAR(191) NOT NULL,
    ADD COLUMN `transactionDate` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `watchlist`;

-- CreateTable
CREATE TABLE `watchlists` (
    `userId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `coinSymbol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watchlists` ADD CONSTRAINT `watchlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
