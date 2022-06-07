const roleReducer = (state = null, action) => {
  switch (action.type) {
    case "INSERT_ROLE":
      return action.payload;
    case "REMOVE_ROLE":
      return null;
    default:
      return state;
  }
};
export default roleReducer;
