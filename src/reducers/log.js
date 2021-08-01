let stateHistory = [];
let saveTimer = false;

function Timer() {
  saveTimer = true;
  setTimeout(function () {
    saveTimer = false;
  }, 4000);
}

export default function log(state = "", action) {
  switch (action.type) {
    case "ADD_TO_LOG":
      stateHistory.push(state);
      let lineBreak = "";
      if (state !== "" && action.payload !== "") {
        lineBreak = "\n";
      }
      return state + lineBreak + action.payload;

    case "CHANGE_LOG":
      if (action.payload === "") {
        stateHistory = [];
        return action.payload;
      }

      if (!saveTimer) {
        stateHistory.push(state);
        Timer();
      }

      return action.payload;

    case "UNDO_LOG":
      if (stateHistory.length === 0) {
        return state;
      }
      const restoredState = `${stateHistory[stateHistory.length - 1]}`;
      stateHistory.pop();

      return restoredState;

    default:
      return state;
  }
}
