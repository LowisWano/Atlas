-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_playerId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringQuest" DROP CONSTRAINT "RecurringQuest_questId_fkey";

-- DropEnum
DROP TYPE "FrequencyType";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringQuest" ADD CONSTRAINT "RecurringQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
