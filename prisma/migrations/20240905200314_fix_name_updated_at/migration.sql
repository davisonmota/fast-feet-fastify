/*
  Warnings:

  - You are about to drop the column `updateAt` on the `delivery_partner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "delivery_partner" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
