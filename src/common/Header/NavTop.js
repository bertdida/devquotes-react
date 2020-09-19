import React, { useState, forwardRef } from 'react';
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
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

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

function MoreOptions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, signOut, toggleTheme, isDarkTheme } = props;
  const isAdmin = user && user.is_admin;
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

  function _signOut() {
    signOut();
    hide();
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={show} aria-label="open more menu">
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
        {user && (
          <Option
            icon={SendIcon}
            onClick={hide}
            component={Link}
            to={isAdmin ? '/create' : '/submit'}
            text={`${isAdmin ? 'Create' : 'Submit'} Quote`}
          />
        )}

        {isAdmin && (
          <Option
            icon={DraftsIcon}
            onClick={hide}
            component={Link}
            to="/admin/quotes"
            text="Manage Quotes"
          />
        )}

        <Option
          onClick={_toggleTheme}
          text={`Dark Theme: ${isDarkTheme ? 'On' : 'Off'}`}
          icon={isDarkTheme ? Brightness4Icon : Brightness7Icon}
        />

        {user && (
          <Option onClick={_signOut} text="Sign Out" icon={ExitToAppIcon} />
        )}
      </Menu>
    </React.Fragment>
  );
}

export function NavTop({ user, ...props }) {
  return (
    <React.Fragment>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>

      <Button color="inherit" component={Link} to="/quotes">
        Quotes
      </Button>

      {user && (
        <Button color="inherit" component={Link} to="/favorites">
          Favorites
        </Button>
      )}

      <Button color="inherit" component={Link} to="/search">
        Search
      </Button>

      {!user && (
        <Button color="inherit" component={Link} to="/signin">
          Sign In
        </Button>
      )}

      <MoreOptions user={user} {...props} />
    </React.Fragment>
  );
}

NavTop.propTypes = {
  user: PropTypes.object,
};

MoreOptions.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};

Option.displayName = 'Option';
Option.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
