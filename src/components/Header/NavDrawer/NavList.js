import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

import { useAuth } from 'common/hooks/useAuth';
import { useTheme } from 'common/hooks/useTheme';
import * as api from './api-calls';

export function NavList({ onClose, width }) {
  const { user, ...auth } = useAuth();
  const { toggle: toggleTheme, isDarkTheme } = useTheme();

  const isAdmin = user && user.is_admin;

  async function signOut() {
    await api.signOut();
    auth.signOut();
  }

  return (
    <Box
      width={width}
      onClick={onClose}
      onKeyDown={onClose}
      role="presentation"
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/quotes">
          <ListItemText primary="Quotes" />
        </ListItem>

        <ListItem button component={Link} to="/favorites">
          <ListItemText primary="Favorites" />
        </ListItem>
      </List>

      <Divider />

      <List>
        {!isAdmin && (
          <ListItem button component={Link} to="/submit">
            <ListItemText primary="Submit Quote" />
          </ListItem>
        )}

        {isAdmin && (
          <>
            <ListItem button component={Link} to="/admin/quotes">
              <ListItemText primary="Manage Quotes" />
            </ListItem>

            <ListItem button component={Link} to="/admin/create">
              <ListItemText primary="Create Quote" />
            </ListItem>
          </>
        )}

        {user && (
          <ListItem button onClick={signOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        )}
      </List>

      <Divider />

      <List>
        <ListItem button onClick={toggleTheme}>
          <ListItemText primary={`Dark Theme: ${isDarkTheme ? 'On' : 'Off'}`} />
        </ListItem>
      </List>
    </Box>
  );
}

NavList.propTypes = {
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number,
};
