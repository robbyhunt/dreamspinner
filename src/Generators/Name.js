import DiceSound from "../util/DiceSound";
import fantasy from "./nameData";

export default function Name(event) {
  let genre;
  if (event.target.id === "fantasy") {
    genre = fantasy;
  }

  const result = ` > ${genre[Math.floor(Math.random() * genre.length)]}`;

  DiceSound();

  return result;
}
