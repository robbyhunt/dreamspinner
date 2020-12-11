import AddToLog from "../util/AddToLog";
import DiceSound from "../util/DiceSound"

function Fate(event) {  

  let modifier;
  if (event.target.id === "fateunlikely") {
    modifier = -2
  } else if (event.target.id === "fatelikely") {
    modifier = 2
  } else {
    modifier = 0
  }

  const yesNo = (Math.floor(Math.random() * 10) + 1) + modifier > 5 ? "Yes" : "No";

  const andBut = (Math.floor(Math.random() * 10) + 1) > 7 ? ((Math.floor(Math.random() * 10) + 1) > 5 ? ", but" : ", and") : "";

  const result = yesNo + andBut

  DiceSound()

    return (
      AddToLog(result)
    );
}

export default Fate;