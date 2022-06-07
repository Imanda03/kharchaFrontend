import { SET_CATEGORY } from "../constants";

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
export default categoryReducer;
