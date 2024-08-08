/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transaction_id` on the `transactions` table. All the data in the column will be lost.
  - The required column `transactionId` was added to the `transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `transactions` DROP PRIMARY KEY,
    DROP COLUMN `transaction_id`,
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`transactionId`);
