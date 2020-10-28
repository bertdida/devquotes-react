import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import firebase from 'firebase/app';

import api from 'common/api';
import { useTheme } from 'common/hooks/useTheme';
import { useUserState, useUserDispatch, actions } from 'common/hooks/useUser';

export function NavList({ onClose }) {
  const user = useUserState();
  const dispatch = useUserDispatch();
  const { toggle: toggleTheme, isDarkMode } = useTheme();
  const isAdmin = user && user.is_admin;

  async function signOut() {
    await api.signOut();
    await firebase.auth().signOut();
    dispatch({ type: actions.SIGN_OUT });
  }

  return (
    <Box onClick={onClose} onKeyDown={onClose} role="presentation">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/quotes">
          <ListItemIcon>
            <FormatQuoteIcon />
          </ListItemIcon>
          <ListItemText primary="Quotes" />
        </ListItem>

        <ListItem button component={Link} to="/favorites">
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="My Favorites" />
        </ListItem>
      </List>

      {!isAdmin && (
        <ListItem button component={Link} to="/submit">
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Submit Quote" />
        </ListItem>
      )}

      {isAdmin && (
        <>
          <ListItem button component={Link} to="/admin/quotes">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Quotes" />
          </ListItem>

          <ListItem button component={Link} to="/admin/quotes/create">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Quote" />
          </ListItem>
        </>
      )}

      <Divider />

      <List>
        <ListItem button onClick={toggleTheme}>
          <ListItemIcon>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText primary={`Dark Theme: ${isDarkMode ? 'On' : 'Off'}`} />
        </ListItem>

        {user && (
          <ListItem button onClick={signOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}

NavList.propTypes = {
  onClose: PropTypes.func.isRequired,
};
