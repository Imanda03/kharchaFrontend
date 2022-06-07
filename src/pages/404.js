import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const NOT_FOUND = () => {
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
          <Typography variant="h4">:(</Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Typography variant="h4">~ 404 NOT FOUND! ~</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NOT_FOUND;
