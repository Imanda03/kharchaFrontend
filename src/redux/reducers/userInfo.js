import { INSERT_USER, REMOVE_USER } from "../constants";

const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case INSERT_USER:
      return action.payload;
    // case "SET_USER_SHOP": {
    //   return {
    //     ...state,
    //     shop_detail: action.payload,
    //   };
    // }
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
};
export default userInfoReducer;
