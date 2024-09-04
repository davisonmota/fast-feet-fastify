/*
  Warnings:

  - You are about to drop the column `UpdateAt` on the `delivery_partner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "delivery_partner" DROP COLUMN "UpdateAt",
ADD COLUMN     "updateAt" TIMESTAMP(3);
