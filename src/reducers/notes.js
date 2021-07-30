export default function notes(state = "", action) {
  switch (action.type) {
    case "CHANGE_NOTES":
      return action.payload;

    default:
      return state;
  }
}
