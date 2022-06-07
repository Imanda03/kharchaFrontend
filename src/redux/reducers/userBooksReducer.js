import { INSERT_USER_BOOKS, REMOVE_USER_BOOKS } from "../constants";
const userBooksReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_USER_BOOKS:
      return action.payload;
    case REMOVE_USER_BOOKS:
      return [];
    default:
      return state;
  }
};
export default userBooksReducer;
