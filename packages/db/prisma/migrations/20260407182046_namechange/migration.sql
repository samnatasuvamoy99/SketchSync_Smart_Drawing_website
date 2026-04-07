/*
  Warnings:

  - You are about to drop the column `data` on the `Snapshot` table. All the data in the column will be lost.
  - Added the required column `coordinates` to the `Snapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snapshot" DROP COLUMN "data",
ADD COLUMN     "coordinates" TEXT NOT NULL;
