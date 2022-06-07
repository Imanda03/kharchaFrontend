import * as React from "react";
import Card from "@mui/material/Card";
import { Button, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function HelpCard({ accountBook }) {
  return (
    <Button
      component={(Card, Link)}
      to={`/account-detail/${accountBook.id}`}
      variant={"text"}
      sx={{
        padding: 0,
        color: "white",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderRadius: 4,
        height: "100%",
        backgroundSize: "250%",
        transition: "0.6s",
        backgroundImage:
          "linear-gradient(45deg, rgba(46,60,232,1) 0%, rgba(71,140,232,1) 39%, rgba(95,225,255,1) 100%)",
        "&:hover": {
          backgroundPosition: "right",
        },
        "&:focus": {
          backgroundPosition: "right",
        },
      }}
    >
      <CardHeader
        title={<Typography variant="h6">{accountBook.title}</Typography>}
      />
      <CardActions
        sx={{
          width: "100%",
        }}
        disableSpacing
      >
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography variant="body" sx={{ px: 1 }}>
              Rs. {accountBook.balance}/-
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={`/edit-account/${accountBook.id}`}
              variant="outlined"
              sx={{
                mx: 1,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(46,60,232,1)",
                },
              }}
            >
              edit
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Button>
  );
}
