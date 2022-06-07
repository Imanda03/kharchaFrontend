import React from "react";
import { Container, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <Container component="main" sx={{ paddingY: 0, paddingX: 2, marginY: 10 }}>
      <LinearProgress />
    </Container>
  );
};

export default Loading;
