import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { host } from "../AxiosInstance";
import { green } from "@mui/material/colors";

const UserMenu = [
  { name: "My Account Books", to: "/" },
  { name: "Logout ?", to: "/logout" },
];

const NavMenu = [
  // { name: "Helps", to: "/helps" },
  // { name: "Categories", to: "/categories" },
];

const Navbar = ({ isAuthenticated }) => {
  const authenticated = isAuthenticated;
  const user = useSelector((state) => state.user);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ color: "#fff", paddingX: "10px" }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            color: "white",
            textDecoration: "none",
          }}
        >
          Kharcha
        </Typography>
        {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {NavMenu.map((menu) => {
              return (
                <MenuItem
                  key={menu.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={menu.to}
                >
                  <Typography textAlign="center">{menu.name}</Typography>
                </MenuItem>
              );
            })}
          </Menu>
        </Box> */}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            color: "white",
            textDecoration: "none",
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          Kharcha
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {NavMenu.map((menu) => {
            return (
              <Button component={Link} to={menu.to} sx={{ color: "white" }}>
                {menu.name}
              </Button>
            );
          })}
        </Box>
        {authenticated ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Actions">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: green[500] }}
                  alt={user.first_name || user.email}
                  src={host + user.avatar_path}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                to={"/profile"}
              >
                <ProfileCard user={user} />
              </MenuItem>
              {UserMenu.map((btn) => (
                <MenuItem
                  key={btn.name}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={btn.to}
                >
                  <Typography textAlign="center">{btn.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ ml: 4, color: "white" }}
              color="secondary"
              component={Link}
              to="/login"
              variant="outlined"
            >
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
