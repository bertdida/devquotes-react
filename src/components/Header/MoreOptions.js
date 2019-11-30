import React, { useState, forwardRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import { ThemeContext } from "../Theme";
import { app } from "../Signin/firebase";

const useStyles = makeStyles(theme => ({
  menuIcon: {
    minWidth: theme.spacing(5)
  }
}));

const Option = forwardRef(({ text, icon: Icon, ...props }, ref) => {
  const classes = useStyles();

  return (
    <MenuItem {...props} ref={ref}>
      <ListItemIcon className={classes.menuIcon}>
        <Icon />
      </ListItemIcon>
      <Typography>{text}</Typography>
    </MenuItem>
  );
});

function MoreOptions({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);

  function show(event) {
    setAnchorEl(event.currentTarget);
  }

  function hide() {
    setAnchorEl(null);
  }

  function _toggleTheme() {
    toggleTheme();
    hide();
  }

  async function signOut() {
    await app.auth().signOut();
    hide();
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={show}>
        <MoreIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={hide}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {user && (
          <Option onClick={signOut} text="Sign Out" icon={ExitToAppIcon} />
        )}
        <Option
          onClick={_toggleTheme}
          text={"Dark Theme: " + (isDarkTheme ? "On" : "Off")}
          icon={isDarkTheme ? Brightness4Icon : Brightness7Icon}
        />
      </Menu>
    </React.Fragment>
  );
}

export default MoreOptions;
