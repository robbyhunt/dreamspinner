import DiceSound from "./DiceSound";

function RollDice(event) {
  const result = ` > [${event.target.id}]: ${
    Math.floor(Math.random() * event.target.id.substring(1, 4)) + 1
  }`;

  DiceSound();

  return result;
}

export default RollDice;
