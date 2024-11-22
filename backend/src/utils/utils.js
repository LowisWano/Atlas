function calculateRewards(questType, difficulty) {
  let gold = 0;
  let exp = 0;

  switch (questType) {
    case 'NORMAL_QUEST':
      gold = 50;
      exp = 100;
      break;
    case 'DAILY_QUEST':
      gold = 30;
      exp = 50;
      break;
    case 'MAIN_QUEST':
      gold = 100;
      exp = 200;
      break;
    default:
      gold = 0;
      exp = 0;
  }

  switch (difficulty) {
    case 'EASY':
      gold *= 1;
      exp *= 1;
      break;
    case 'MEDIUM':
      gold *= 1.5;
      exp *= 1.5;
      break;
    case 'HARD':
      gold *= 2;
      exp *= 2;
      break;
    case 'INSANE':
      gold *= 3;
      exp *= 3;
      break;
    default:
      gold *= 1;
      exp *= 1;
  }

  return { gold, exp };
}

module.exports = { calculateRewards };