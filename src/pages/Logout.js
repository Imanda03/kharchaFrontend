import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AxiosInstance from "../AxiosInstance";
import { Button } from "@mui/material";
import { log_out, insert_user, remove_user_books } from "../redux/action";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Logout = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cleanup = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    dispatch(insert_user({}));
    dispatch(remove_user_books());
    dispatch(log_out());
    toast.error("You have been logged out!");
    setIsProcessing(true);
  };
  const doLogout = () => {
    setIsProcessing(true);
    AxiosInstance.post("auth/token/blacklist/")
      .then((resp) => {
        cleanup();
      })
      .catch((err) => {
        cleanup();
      });
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Kharcha | Logout</title>
      </Helmet>
      <Paper
        sx={{
          padding: "1vh 2vw",
          border: "5px solid",
          borderColor: "primary.main",
          paddingY: 15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Logout</Typography>
          <Box component="form" noValidate sx={{ marginY: 3 }}>
            <Typography variant="h5">
              Are you sure you want to logout?
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            size="lg"
            color="error"
            onClick={doLogout}
            disabled={isProcessing}
          >
            {isProcessing ? <CircularProgress /> : "Logout?"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Logout;
