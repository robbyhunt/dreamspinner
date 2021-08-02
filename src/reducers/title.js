export default function title(state = "Untitled Game", action) {
  switch (action.type) {
    case "CHANGE_TITLE":
      return action.payload;

    default:
      return state;
  }
}
