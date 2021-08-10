export default function characters(
  state = [
    {
      name: "",
      avatar: "",
      resources: [],
      stats: [[], [], []],
      equipment: [],
      powers: [],
      inventory: [],
    },
  ],
  action
) {
  switch (action.type) {
    case "CHANGE_CHARACTERS":
      return action.payload;

    default:
      return state;
  }
}
