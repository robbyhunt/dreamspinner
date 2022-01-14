import DiceSound from "./DiceSound";

function RollDice(diceType, isExplosive, isWild = false, statName = null) {
  let maxValue = parseInt(diceType.substring(1, 4));
  let lastDice = Math.floor(Math.random() * maxValue) + 1;
  let currentTotal = lastDice;
  let explosions = 0;

  let lastWildDice = isWild ? Math.floor(Math.random() * 6) + 1 : null;
  let currentWildTotal = lastWildDice;
  let wildExplosions = 0;

  if (isExplosive) {
    while (lastDice === maxValue) {
      explosions++;
      const newDice = Math.floor(Math.random() * maxValue) + 1;
      currentTotal += newDice;
      lastDice = newDice;
    }
  }

  if (isWild) {
    while (lastWildDice === 6) {
      wildExplosions++;
      const newDice = Math.floor(Math.random() * 6) + 1;
      currentWildTotal += newDice;
      lastWildDice = newDice;
    }
  }

  let explosionText = explosions > 0 ? "(BOOM!)" : "";

  let wildExplosionsText = wildExplosions > 0 ? "(BOOM!)" : "";
  let wildText = isWild
    ? `  [Wild]: ${currentWildTotal}${wildExplosionsText}`
    : "";

  const result = ` > [${
    statName ? statName : diceType
  }]: ${currentTotal}${explosionText}${wildText}`;

  DiceSound();

  return result;
}

export default RollDice;
