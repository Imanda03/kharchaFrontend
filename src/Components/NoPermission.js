import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const NoPermission = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
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
          <Typography component="h1" variant="h5">
            :(
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            You do not have permission to perform this action.
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NoPermission;
