export default function threads(state = "", action) {
  switch (action.type) {
    case "CHANGE_THREADS":
      return action.payload;

    default:
      return state;
  }
}
