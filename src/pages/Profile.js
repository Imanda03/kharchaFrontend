import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AxiosInstance, { host } from "../AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { insert_user } from "../redux/action";
import { Helmet } from "react-helmet";
import {
  CircularProgress,
  Typography,
  Grid,
  TextField,
  Container,
  Button,
  Box,
  Paper,
  Avatar,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { GENDERS } from "../redux/constants";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { isUserCustomer } from "../Components/Utils";

const MyAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const genders = GENDERS;

  const [user, setUser] = useState(useSelector((state) => state.user));

  React.useEffect(() => {
    if (!user) {
      AxiosInstance.get("auth/user")
        .then((resp) => {
          let new_user_data = resp.data;
          setUser(new_user_data);
          dispatch(insert_user(new_user_data));
          localStorage.setItem("user", JSON.stringify(new_user_data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const profileForm = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      let formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      AxiosInstance.patch("auth/user/", formData)
        .then((resp) => {
          let new_user_data = resp.data;
          dispatch(insert_user(new_user_data));
          setUser(new_user_data);
          localStorage.setItem("user", JSON.stringify(new_user_data));
          toast.success("Profile Updated Successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setSuccess(true);
        })
        .catch((err) => {
          setSuccess(false);
          profileForm.setErrors(err.response.data);
          if (err.response.data.error) {
            toast.error(err.response.data.error[0], {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        });
      profileForm.setSubmitting(false);
    },
  });
  return loading ? (
    <Container
      component="main"
      sx={{ padding: "0", marginY: 10 }}
      id="loading-container"
    >
      <LinearProgress />
    </Container>
  ) : (
    <>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ marginTop: 3, marginBottom: 8 }}
      >
        <Helmet>
          <title>Profile | {`${user.email}`} | Expense Tracker</title>
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
            <Avatar
              alt={user.first_name || user.email}
              src={host + user.avatar_path}
              sx={{
                height: 200,
                width: 200,
                border: "8px solid",
                borderColor: "primary.main",
                margin: 5,
                bgcolor: green[500],
                fontSize: "90px",
              }}
            ></Avatar>
            {/* <TextField
              type="file"
              accept="image/*"
              component={Button}
              id="avatar"
              name="avatar"
              error={
                profileForm.touched.avatar && Boolean(profileForm.errors.avatar)
              }
              helperText={
                profileForm.touched.avatar && profileForm.errors.avatar
              }
              onChange={(event) => {
                profileForm.setFieldValue(
                  "avatar",
                  event.currentTarget.files[0]
                );
              }}
            /> */}
            <Typography variant="h6">Profile: {user.email}</Typography>
            <Typography variant="p">
              <Link to="/change-password">Change Password</Link>
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={profileForm.handleChange}
                  value={profileForm.values.first_name}
                  error={
                    profileForm.touched.first_name &&
                    Boolean(profileForm.errors.first_name)
                  }
                  helperText={
                    profileForm.touched.first_name &&
                    profileForm.errors.first_name
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
                  onChange={profileForm.handleChange}
                  value={profileForm.values.last_name}
                  error={
                    profileForm.touched.last_name &&
                    Boolean(profileForm.errors.last_name)
                  }
                  helperText={
                    profileForm.touched.last_name &&
                    profileForm.errors.last_name
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  onChange={profileForm.handleChange}
                  value={profileForm.values.phone}
                  error={
                    profileForm.touched.phone &&
                    Boolean(profileForm.errors.phone)
                  }
                  helperText={
                    profileForm.touched.phone && profileForm.errors.phone
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="gender"
                  name="gender"
                  select
                  variant="outlined"
                  label="Gender"
                  fullWidth
                  onChange={profileForm.handleChange}
                  value={profileForm.values.gender}
                  error={
                    profileForm.touched.gender &&
                    Boolean(profileForm.errors.gender)
                  }
                  helperText={
                    profileForm.touched.gender && profileForm.errors.gender
                  }
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                {isUserCustomer(user) ? (
                  <TextField
                    id="dob"
                    name="dob"
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    onChange={profileForm.handleChange}
                    value={profileForm.values.dob}
                    error={
                      profileForm.touched.dob && Boolean(profileForm.errors.dob)
                    }
                    helperText={
                      profileForm.touched.dob && profileForm.errors.dob
                    }
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ m: 1, position: "relative" }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={profileForm.handleSubmit}
                    disabled={profileForm.isSubmitting}
                  >
                    {success ? <CheckIcon /> : <SaveIcon />}
                  </Fab>
                  {profileForm.isSubmitting ? (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default MyAccount;
