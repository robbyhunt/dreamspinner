import DiceSound from "./DiceSound";

function RollDice(event, isWild) {
  let result;

  const diceResult = ` > [${event.target.id}]: ${
    Math.floor(Math.random() * event.target.id.substring(1, 4)) + 1
  }`;

  const wildResult = `\n > [Wild]: ${Math.floor(Math.random() * 6 + 1)}`;

  if (isWild) {
    result = diceResult + wildResult;
  }

  DiceSound();

  return result;
}

export default RollDice;
