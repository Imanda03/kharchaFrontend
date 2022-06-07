import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  INSERT_TOKEN,
  INSERT_USER,
  INSERT_ALERT,
  REMOVE_ALERT,
  SET_CATEGORY,
  SET_HOME_META,
  INSERT_USER_BOOKS,
  REMOVE_USER_BOOKS,
} from "../constants";
export const log_in = () => {
  return {
    type: AUTHENTICATED,
  };
};

export const log_out = () => {
  return {
    type: NOT_AUTHENTICATED,
  };
};

export const insert_token = (token) => {
  return {
    type: INSERT_TOKEN,
    payload: token,
  };
};

export const insert_user = (user) => {
  return {
    type: INSERT_USER,
    payload: user,
  };
};

export const insert_alert = (alert) => {
  return {
    type: INSERT_ALERT,
    payload: alert,
  };
};

export const remove_alert = () => {
  return {
    type: REMOVE_ALERT,
  };
};

export const set_category = (categories) => {
  return {
    type: SET_CATEGORY,
    payload: categories,
  };
};

export const set_home_meta = (meta) => {
  return {
    type: SET_HOME_META,
    payload: meta,
  };
};

export const insert_user_books = (books) => {
  return {
    type: INSERT_USER_BOOKS,
    payload: books,
  };
};

export const remove_user_books = () => {
  return {
    type: REMOVE_USER_BOOKS,
  };
};
