import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import AxiosInstance from "../AxiosInstance";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { log_in, insert_user } from "../redux/action";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address!").required("Required"),
    password: Yup.string().required("Password cannot be empty!"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("/auth/token/obtain/", values)
        .then((resp) => {
          localStorage.setItem("access_token", resp.data.access);
          AxiosInstance("auth/user/").then((resp) => {
            let userData = resp.data;
            dispatch(insert_user(userData));
            toast.success(
              `Welcome ${
                userData.first_name.length > 0
                  ? `${userData.first_name} ${userData.last_name}`
                  : userData.email
              }`,
              {
                position: toast.POSITION.BOTTOM_CENTER,
              }
            );
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(log_in());
          });
          setSubmitting(false);
          history.push("/helps");
        })
        .catch((err) => {
          toast.error(Object.values(err.response.data)[0][0], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setSubmitting(false);
        });
    },
    validationSchema: LoginSchema,
  });
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Kharcha | Login</title>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  error={
                    loginForm.touched.email && Boolean(loginForm.errors.email)
                  }
                  helperText={loginForm.touched.email && loginForm.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={loginForm.handleSubmit}
              disabled={loginForm.isSubmitting || !loginForm.isValid}
            >
              {loginForm.isSubmitting ? <CircularProgress /> : "Login"}
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
