import AddToLog from "../util/AddToLog";
import DiceSound from "../util/DiceSound"

const fantasy = {1: ["haunted", "cursed", "dark", "musty old", "ruined", "unfinished", "hidden", "foul smelling", "strange", "living", "shapeshifting", "overgrown", "ordinary looking", "enchanted", "strangely alluring", "growling", "singing", "ever burning", "hovering", "damp"], 2: ["house", "villa", "small community of houses", "estate", "castle", "fort", "fortress", "underground complex", "temple", "monestary", "graveyard", "monument", "statue", "tree", "basement", "mausoleum", "giant nest", "water-mill", "granary", "workshop", "barrack", "mansion", "warehouse", "stable", "kennel", "sign post", "deep hole in the ground", "shop", "marketsplace", "ship", "gate", "tower", "wall", "inn", "tavern", "hotel", "quarry", "mine", "gate", "shrine", "door", "hatch", "ladder", "bridge", "bedroll", "tent", "tree house", "log cabin", "hut", "shed", "obelisk", "monolith", "column", "city block", "guard house", "hospital", "townhouse", "hamlet", "community", "township", "dwelling", "park", "field", "property", "area", "row of townhouses", "lodge", "lumber camp", "fisherman’s hut", "sanctuary", "chapel", "holy site", "crossroads", "small sized town", "medium sized town", "large sized town", "small sized settlement", "medium sized settlement", "large sized settlement", "small sized village", "medium sized village", "large sized village", "compound", "construction site", "gravestone", "tomb", "cairn", "mural", "garden", "greenhouse", "observatory", "museum", "manor", "château", "palace", "citadel", "keep", "stronghold", "den", "lair"]}

function Place(event) {

  let genre
  if (event.target.id === "fantasy") {
    genre = fantasy
  }

  const place = genre[1][Math.floor(Math.random() * genre[1].length)]

  let pre
  if (place.charAt(0) === "a" || place.charAt(0) === "e" || place.charAt(0) === "i" || place.charAt(0) === "o" || place.charAt(0) === "u") {
    pre = "An"
  } else {
    pre = "A"
  }

  const result = ` > ${pre} ${place} ${genre[2][Math.floor(Math.random() * genre[2].length)]}`

  DiceSound()
  
  return (
    AddToLog() + AddToLog(result)
  );
}

export default Place;
