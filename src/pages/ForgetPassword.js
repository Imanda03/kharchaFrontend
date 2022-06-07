import { React } from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { useFormik } from "formik";
import AxiosInstance from "../AxiosInstance";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import {
  Divider,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required"),
  });

  const forgetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("auth/user/password/forget/", values)
        .then((resp) => {
          toast.success("Password reset email sent!", {
            autoClose: false,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        })
        .catch((err) => {
          forgetPasswordForm.setErrors(err.response.data);
          toast.warning(err.response.data.detail, {
            autoClose: false,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        });
      setSubmitting(false);
      forgetPasswordForm.resetForm();
    },
    validationSchema: ForgetPasswordSchema,
  });
  return (
    <Container maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Kharcha | Forget Password</title>
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
            Forget Password
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ marginY: 2, paddingY: 2 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={forgetPasswordForm.handleChange}
                value={forgetPasswordForm.values.email}
                error={
                  forgetPasswordForm.touched.email &&
                  Boolean(forgetPasswordForm.errors.email)
                }
                helperText={
                  forgetPasswordForm.touched.email &&
                  forgetPasswordForm.errors.email
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
            onClick={forgetPasswordForm.handleSubmit}
            disabled={forgetPasswordForm.isSubmitting}
          >
            Reset Password
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Need an account? <Link to="/signup">Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
