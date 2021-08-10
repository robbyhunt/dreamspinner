import { combineReducers } from "redux";
import log from "./log";
import input from "./input";
import user from "./user";
import notes from "./notes";
import threads from "./threads";
import npcs from "./npcs";
import genre from "./genre";
import title from "./title";
import characters from "./characters";
import inspiration from "./inspiration";

export default combineReducers({
  log,
  input,
  user,
  notes,
  threads,
  npcs,
  genre,
  title,
  characters,
  inspiration,
});
