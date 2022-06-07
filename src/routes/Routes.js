import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import AccountBooksList from "../pages/AccountBooksList";
import AccountBookDetail from "../pages/AccountBookDetail";
import EditAccountBook from "../pages/EditAccountBook";
import { ToastContainer, toast } from "react-toastify";
import NOT_FOUND from "../pages/404";
import ActivateAccount from "../pages/ActivateAccount";
import ChangePassword from "../pages/ChangePassword";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import Profile from "../pages/Profile";
import Box from "@mui/material/Box";

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.BOTTOM_CENTER}
      />
      <Navbar isAuthenticated={isAuthenticated} />
      <CssBaseline />
      <ScrollToTop />
      <Switch>
        <Box sx={{ minHeight: "90vh" }}>
          <PrivateRoute exact path="/" component={AccountBooksList} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/helps" component={AccountBooksList} />
          <Route exact path="/activate" component={ActivateAccount} />
          <PrivateRoute
            exact
            path="/account-detail/:account_book_id"
            component={AccountBookDetail}
          />
          <PrivateRoute
            exact
            path="/edit-account/:account_book_id"
            component={EditAccountBook}
          />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/forget" component={SetNewPassword} />
          <PrivateRoute
            exact
            path="/change-password"
            component={ChangePassword}
          />
          <PrivateRoute exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Box>
        <Route path="*" component={NOT_FOUND} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
