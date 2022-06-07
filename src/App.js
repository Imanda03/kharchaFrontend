import { ThemeProvider } from "@mui/material";
import React from "react";
import Routes from "./routes/Routes";
import theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import { insert_user, log_in, insert_user_books } from "./redux/action";
import AxiosInstance from "./AxiosInstance";
import { HELP_PAGINATION_ITEM_LIMIT } from "./redux/constants";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  const setAccountBooks = () => {
    AxiosInstance.get(
      `/expensetracker/account-books/?limit=${HELP_PAGINATION_ITEM_LIMIT}&offset=0`
    )
      .then((resp) => {
        insert_user_books(resp.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setLoginState = async () => {
    if (!user) {
      AxiosInstance.get("auth/user/").then((resp) => {
        let new_user_data = resp.data;
        localStorage.setItem("user", JSON.stringify(new_user_data));
        dispatch(insert_user(new_user_data));
        setAccountBooks();
      });
    } else {
      dispatch(insert_user(user));
      setAccountBooks();
    }
    dispatch(log_in());
  };

  if (token) {
    setLoginState();
  }

  const isAuthenticated = useSelector((state) => state.authenticated);

  return (
    <ThemeProvider theme={theme}>
      <Routes isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
}

export default App;
