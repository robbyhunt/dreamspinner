import AddToLog from "./AddToLog";
import DiceSound from "./DiceSound"

function RollDice(event) {   

  const result = ` > ${event.target.id} result: ${Math.floor(Math.random() * event.target.id.substring(1, 3)) + 1}`;

  DiceSound()
  
  return(
    AddToLog() + AddToLog(result)
  )
}

export default RollDice;


