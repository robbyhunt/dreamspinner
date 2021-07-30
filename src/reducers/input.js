export default function input(state = "", action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return action.payload;

    default:
      return state;
  }
}
