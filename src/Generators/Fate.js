import DiceSound from "../util/DiceSound";

export default function Fate(event) {
  let amountOfDice = 2;
  if (event.target.id === "fateunlikely" || event.target.id === "fatelikely") {
    amountOfDice = 3;
  }

  let diceResults = [];
  for (let i = 0; i < amountOfDice; i++) {
    diceResults.push(Math.floor(Math.random() * 6) + 1);
  }

  let droppedDice = diceResults[0];
  let diceToDrop;
  if (event.target.id === "fatelikely") {
    diceToDrop = 1;
    for (let i = 1; i < diceResults.length; i++) {
      if (droppedDice > diceResults[i]) {
        droppedDice = diceResults[i];
        diceToDrop = i;
      }
    }
    diceResults.splice(diceToDrop, 1);
  } else if (event.target.id === "fateunlikely") {
    diceToDrop = 1;
    for (let i = 1; i < diceResults.length; i++) {
      if (droppedDice < diceResults[i]) {
        droppedDice = diceResults[i];
        diceToDrop = i;
      }
    }
    diceResults.splice(diceToDrop, 1);
  }

  const yesNo = diceResults[0] + diceResults[1] > 6 ? "Yes" : "No";

  let dice1EvenOdd = diceResults[0] % 2 === 0 ? "Even" : "Odd";
  let dice2EvenOdd = diceResults[1] % 2 === 0 ? "Even" : "Odd";

  const andBut =
    dice1EvenOdd === "Even" && dice2EvenOdd === "Even"
      ? ", and..."
      : dice1EvenOdd === "Odd" && dice2EvenOdd === "Odd"
      ? ", but..."
      : "";

  const result = ` > ${yesNo + andBut}`;

  DiceSound();

  if (diceResults[0] === diceResults[1]) {
    return [result, diceResults];
  } else {
    return result;
  }
}
