import { SET_HOME_META } from "../constants";

const homeMetaReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_HOME_META:
      return action.payload;
    default:
      return state;
  }
};
export default homeMetaReducer;
