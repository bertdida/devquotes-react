import React, { useState, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import SendIcon from '@material-ui/icons/Send';

import { ThemeContext } from 'common/Theme';
import app from 'common/firebase';
import * as api from './api-calls';

const useStyles = makeStyles(theme => ({
  menuIcon: {
    minWidth: theme.spacing(5),
  },
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

export default function MoreOptions({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);
  const open = Boolean(anchorEl);

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
    await api.signOut();
    await app.auth().signOut();
    hide();
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={show} data-testid="moreOptions">
        <MoreIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={hide}
        keepMounted
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {user && user.is_admin && (
          <Option
            text="Create Quote"
            icon={SendIcon}
            onClick={hide}
            component={Link}
            to="/create-quote"
            data-testid="createQuote"
          />
        )}
        <Option
          onClick={_toggleTheme}
          text={`Dark Theme: ${isDarkTheme ? 'On' : 'Off'}`}
          icon={isDarkTheme ? Brightness4Icon : Brightness7Icon}
        />
        {user && (
          <Option
            onClick={signOut}
            text="Sign Out"
            icon={ExitToAppIcon}
            data-testid="signOut"
          />
        )}
      </Menu>
    </React.Fragment>
  );
}

Option.displayName = 'Option';
Option.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

MoreOptions.propTypes = {
  user: PropTypes.object,
};