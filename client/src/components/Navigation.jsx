import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthContext } from "../firebase/Auth";
import { NavLink } from "react-router-dom";
import { signout } from "../firebase/firebaseFunctions";
import { fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppLogo from "../AppLogo";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  tabs: {
    fontFamily: "Dancing Script, cursive",
  },
  Toolbar: {
    paddingRight: "15px",
    paddingLeft: "15px",
  },
  Avatar: {
    background: "#F50057",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      width: "300px",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navigation() {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [indexLogin, setIndexValue] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (window.location.pathname == "/login" || "/") {
      setIndexValue(0);
    }
    if (window.location.pathname == "/register") {
      setIndexValue(1);
    }
    if (window.location.pathname == "/journeys/new" || "/") {
      setValue(1);
    }
    if (window.location.pathname == "/requests") {
      setValue(2);
    }
    if (window.location.pathname == "/journeys") {
      setValue(0);
    }
    if (window.location.pathname == "/user/account") {
      setValue(null);
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLoginIndex = (event, newValue) => {
    setIndexValue(newValue);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (link) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(link);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const SignOut = () => {
    handleMenuClose();
    signout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("/user/account")}>
        Profile
      </MenuItem>
      <MenuItem onClick={SignOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("/user/account")}>
        Profile
      </MenuItem>
      <MenuItem onClick={SignOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "3f51b5" }}>
        {currentUser ? (
          <Toolbar variant="dense" className={classes.Toolbar}>
            <div
              className={classes.sectionDesktop}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppLogo />
              <Typography
                style={{
                  fontFamily: "Dancing Script, cursive",
                  fontSize: "20px",
                }}
              >
                Roadster
              </Typography>
            </div>
            <div className={classes.grow} />
            <div className={classes.search}>
              <Tabs
                variant="scrollable"
                style={{ flexGrow: "2" }}
                value={value}
                onChange={handleChange}
              >
                <Tab
                  className={classes.tabs}
                  label="Journeys"
                  index={0}
                  component={NavLink}
                  to="/journeys"
                />
                <Tab
                  className={classes.tabs}
                  label="Plan Journey"
                  index={1}
                  component={NavLink}
                  to="/journeys/new"
                />
                <Tab
                  className={classes.tabs}
                  label="Requests"
                  index={2}
                  component={NavLink}
                  to="/requests"
                />
              </Tabs>
            </div>
            <div className={classes.grow} />
            <div
              className={classes.sectionDesktop}
              style={{ justifyContent: "flex-end" }}
            >
              <Avatar
                aria-label={currentUser.name}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                alt="user image"
                src={currentUser.photoURL}
                className={classes.Avatar}
              >
                {currentUser &&
                  currentUser.displayName &&
                  currentUser.displayName[0]}
              </Avatar>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        ) : (
          <Toolbar className={classes.Toolbar} variant="dense">
            <div
              className={classes.sectionDesktop}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppLogo />
              <Typography
                style={{
                  fontFamily: "Dancing Script, cursive",
                  fontSize: "20px",
                }}
              >
                Roadster
              </Typography>
            </div>
            <div className={classes.grow} />
            <div className={classes.search}>
              <Tabs
                className={classes.tabs}
                variant="scrollable"
                style={{ flexGrow: "2" }}
                value={indexLogin}
                onChange={handleLoginIndex}
              >
                <Tab label="Login" index={0} component={NavLink} to="/login" />
                <Tab
                  className={classes.tabs}
                  label="Register"
                  index={1}
                  component={NavLink}
                  to="/register"
                />
              </Tabs>
            </div>
            <div className={classes.grow} />
            <div style={{ width: "300px", display: "flex" }}></div>
          </Toolbar>
        )}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
