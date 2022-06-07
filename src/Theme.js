import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#c98908", //#2496ed
    },
    secondary: {
      main: "#5e4a20", //80c4a2
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    danger: {
      main: "#ff0a0a",
    },
    likeBtn: {
      main: "#456dfa",
      liked: "#456dfa",
    },
    black: {
      main: "#000",
    },
    avatar: {
      main: "#cea521", //#2496ed
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiAppBar: {
      color: "default",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default Theme;
