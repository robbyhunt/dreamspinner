export default function user(state = {}, action) {
  switch (action.type) {
    case "CHANGE_USER":
      return action.payload;

    default:
      return state;
  }
}
