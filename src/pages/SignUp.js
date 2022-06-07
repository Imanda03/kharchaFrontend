import * as React from "react";
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
import Paper from "@mui/material/Paper";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
    password: Yup.string()
      .min(8, "Your password length must be atleast 8 and alphanumeric.")
      .required("Password cannot be empty!"),
    password2: Yup.string()
      .required("Enter Your Password Again!")
      .test("matchPassword", "Both passwords must match!", (value) => {
        return value === signUpForm.values.password;
      }),
  });

  const signUpForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("auth/user/", values)
        .then((resp) => {
          toast.success(
            `Please verify your account with link sent to ${values.email} and Login.`,
            {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: false,
            }
          );
          signUpForm.resetForm();
          setSubmitting(false);
          history.push("/login");
        })
        .catch((err) => {
          signUpForm.setErrors(err.response.data);
          if (err.response.data.error) {
            toast.error(err.response.data.error[0], {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: false,
            });
          }
          setSubmitting(false);
        });
    },
    validationSchema: SignupSchema,
  });
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "10vh" }}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.first_name}
                  error={
                    signUpForm.touched.first_name &&
                    Boolean(signUpForm.errors.first_name)
                  }
                  helperText={
                    signUpForm.touched.first_name &&
                    signUpForm.errors.first_name
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.last_name}
                  error={
                    signUpForm.touched.last_name &&
                    Boolean(signUpForm.errors.last_name)
                  }
                  helperText={
                    signUpForm.touched.last_name && signUpForm.errors.last_name
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.email}
                  error={
                    signUpForm.touched.email && Boolean(signUpForm.errors.email)
                  }
                  helperText={
                    signUpForm.touched.email && signUpForm.errors.email
                  }
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
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.password}
                  error={
                    signUpForm.touched.password &&
                    Boolean(signUpForm.errors.password)
                  }
                  helperText={
                    signUpForm.touched.password && signUpForm.errors.password
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="confirm-password"
                  onChange={signUpForm.handleChange}
                  value={signUpForm.values.password2}
                  error={
                    signUpForm.touched.password2 &&
                    Boolean(signUpForm.errors.password2)
                  }
                  helperText={
                    signUpForm.touched.password2 && signUpForm.errors.password2
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={signUpForm.handleSubmit}
              disabled={signUpForm.isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account? <Link to="/login">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
