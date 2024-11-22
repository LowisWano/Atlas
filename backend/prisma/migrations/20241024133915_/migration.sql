/*
  Warnings:

  - You are about to drop the column `quest_type` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `questType` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "quest_type",
ADD COLUMN     "questType" "QuestType" NOT NULL;
