import DiceSound from "./DiceSound";

function RollDice(event, isExplosive) {
  let maxValue = parseInt(event.target.id.substring(1, 4));
  let lastDice = Math.floor(Math.random() * maxValue) + 1;
  let currentTotal = lastDice;
  let explosions = 0;

  if (isExplosive) {
    while (lastDice === maxValue) {
      explosions++;
      const newDice = Math.floor(Math.random() * maxValue) + 1;
      currentTotal += newDice;
      lastDice = newDice;
    }
  }

  let explosionText = explosions > 0 ? "(BOOM!)" : "";

  const result = ` > [${event.target.id}]: ${currentTotal}${explosionText}`;

  DiceSound();

  return result;
}

export default RollDice;
