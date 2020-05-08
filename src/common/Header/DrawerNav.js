import React, { useState, useContext } from 'react';
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

import { AuthContext } from 'common/Auth';
import { ThemeContext } from 'common/Theme';
import app from 'common/firebase';
import * as api from './api-calls';

const DRAWER_NAV_WIDTH = 250;

const useStyles = makeStyles({
  drawer: {
    width: DRAWER_NAV_WIDTH,
  },
});

function DrawerNavList({ onClose }) {
  const classes = useStyles();
  const [user] = useContext(AuthContext);
  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);

  async function signOut() {
    await api.signOut();
    await app.auth().signOut();
  }

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

export default function DrawerNav() {
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
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <DrawerNavList onClose={toggleDrawer(false)} />
      </Drawer>
    </React.Fragment>
  );
}

DrawerNavList.propTypes = {
  onClose: PropTypes.func.isRequired,
};
