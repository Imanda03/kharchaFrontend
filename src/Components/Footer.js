import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Link,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

function Copyright() {
  return (
    <>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          
          target="_blank"
        >
          Nist College Team
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      {/* <Container maxWidth="lg" display="flex">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "justify", textJustify: "inter-word" }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Address</Typography>
            <List dense={true} sx={{ marginLeft: "0px" }}>
              <ListItem>
                <ListItemText
                  primary="Kathmandu, 00977, NP"
                  secondary="Reach Us"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="info@expensetracker.com.np"
                  secondary="Email Us"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="+977 01 567XXX" secondary="Call Us" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Typography variant="body1">
              <Link
                color="inherit"
                href="https://facebook.com/see.eu.again"
                target="_blank"
              >
                <FacebookRoundedIcon sx={{ fontSize: "48px", color: "blue" }} />
              </Link>
              <Link
                color="inherit"
                href="https://github.com/nischalstha9"
                target="_blank"
              >
                <GitHubIcon sx={{ fontSize: "48px", color: "black" }} />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container> */}
        <Copyright />
    </Box>
  );
}
