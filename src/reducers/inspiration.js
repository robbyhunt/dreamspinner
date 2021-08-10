export default function inspiration(state = [], action) {
  switch (action.type) {
    case "CHANGE_INSPIRATION":
      return action.payload;

    default:
      return state;
  }
}
