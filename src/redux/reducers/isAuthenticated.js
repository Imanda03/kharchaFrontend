import { AUTHENTICATED, NOT_AUTHENTICATED } from "../constants";

const isAuthenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case NOT_AUTHENTICATED:
      return false;
    case AUTHENTICATED:
      return true;
    default:
      return state;
  }
};
export default isAuthenticatedReducer;
