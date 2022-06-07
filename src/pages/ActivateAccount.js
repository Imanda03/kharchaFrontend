import { React } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import AxiosInstance from "../AxiosInstance";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useQuery } from "../Components/Utils";

export default function ActivateAccount() {
  const history = useHistory();
  const query = useQuery();

  const activateAccountForm = useFormik({
    initialValues: {
      token: query.get("token"),
      identifier: query.get("identifier"),
      type: 0,
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("auth/user/activate/", values)
        .then((resp) => {
          toast.success(
            `Your email was successfully verified. You can login now.`,
            {
              position: toast.POSITION.BOTTOM_CENTER,
            }
          );
          history.push("/login");
        })
        .catch((err) => {
          toast.error(Object.values(err.response.data)[0], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        });
      setSubmitting(false);
    },
  });
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Kharcha | Activate Account</title>
      </Helmet>
      <Paper
        sx={{
          padding: "1vh 2vw",
          border: "5px solid",
          borderColor: "primary.main",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Activate Account</Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Click button below to activate your account.
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              disabled={activateAccountForm.isSubmitting}
            >
              Activate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Need an account? <Link to="/signup">Sign Up</Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/forget-password">Forget Password?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
