-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transactionValue` DOUBLE NOT NULL DEFAULT (coinAmount * coinPrice);
