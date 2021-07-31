export default function input(state = "generic", action) {
  switch (action.type) {
    case "CHANGE_GENRE":
      return action.payload;

    default:
      return state;
  }
}
