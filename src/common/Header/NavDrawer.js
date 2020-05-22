import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const NAV_DRAWER_WIDTH = 250;

const useStyles = makeStyles({
  drawer: {
    width: NAV_DRAWER_WIDTH,
  },
});

function NavDrawerList(props) {
  const classes = useStyles();
  const { user, onClose, signOut, toggleTheme, isDarkTheme } = props;

  return (
    <div
      onClick={onClose}
      onKeyDown={onClose}
      role="presentation"
      className={classes.drawer}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/quotes">
          <ListItemText primary="Quotes" />
        </ListItem>

        {user && (
          <ListItem button component={Link} to="/favorites">
            <ListItemText primary="Favorites" />
          </ListItem>
        )}

        <ListItem button component={Link} to="/search">
          <ListItemText primary="Search" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {user && user.is_admin && (
          <ListItem button component={Link} to="/create">
            <ListItemText primary="Create Quote" />
          </ListItem>
        )}

        {user ? (
          <ListItem button onClick={signOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/signin">
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
      </List>

      <Divider />

      <List>
        <ListItem button onClick={toggleTheme}>
          <ListItemText primary={`Dark Theme: ${isDarkTheme ? 'On' : 'Off'}`} />
        </ListItem>
      </List>
    </div>
  );
}

export function NavDrawer(props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = state => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(state);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="open main navigation"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <NavDrawerList onClose={toggleDrawer(false)} {...props} />
      </Drawer>
    </React.Fragment>
  );
}

NavDrawerList.propTypes = {
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};
