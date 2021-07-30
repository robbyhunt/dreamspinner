export default function log(state = "", action) {
  switch (action.type) {
    case "ADD_TO_LOG":
      let lineBreak = "";
      if (state !== "" && action.payload !== "") {
        lineBreak = "\n";
      }
      return state + lineBreak + action.payload;

    case "CHANGE_LOG":
      return action.payload;

    case "UNDO_LOG":
      return state.replace(/\n.*$/, "");

    default:
      return state;
  }
}
