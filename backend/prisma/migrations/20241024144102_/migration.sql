/*
  Warnings:

  - You are about to drop the column `difficutly` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "difficutly",
ADD COLUMN     "difficulty" "DifficultyType" NOT NULL;
