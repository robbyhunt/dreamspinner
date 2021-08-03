export default function input(state = "fantasy", action) {
  switch (action.type) {
    case "CHANGE_GENRE":
      return action.payload;

    default:
      return state;
  }
}
