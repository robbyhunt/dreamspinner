import Dice from "../audio/dice.mp3"

function DiceSound() {  
  const dice = new Audio(Dice);
  dice.play();
}

export default DiceSound;