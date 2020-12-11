import Dice from "../audio/dice.mp3"

const dice = new Audio(Dice);

function DiceSound() {  
  dice.play();
}

export default DiceSound;