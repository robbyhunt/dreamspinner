export default function npcs(state = "", action) {
  switch (action.type) {
    case "CHANGE_NPCS":
      return action.payload;

    default:
      return state;
  }
}
