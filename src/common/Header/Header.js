import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { useAuth } from 'common/hooks/useAuth';
import { useTheme } from 'common/hooks/useTheme';
import { NavDrawer } from './NavDrawer';
import { SearchField } from './SearchField';
import * as api from './api-calls';

const useStyles = makeStyles(theme => ({
  title: {
    color: 'inherit',
    textDecoration: 'none',
    [theme.breakpoints.down('330')]: {
      display: 'none',
    },
  },
  searchIconButton: {
    padding: theme.spacing(1),
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function Header() {
  const [isSearchShown, setIsSearchShown] = useState(false);

  const classes = useStyles();
  const auth = useAuth();
  const theme = useTheme();

  async function signOut() {
    await api.signOut();
    auth.signOut();
  }

  function showSearch() {
    setIsSearchShown(true);
  }

  function hideSearch() {
    setIsSearchShown(false);
  }

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          {isSearchShown ? (
            <SearchField onHide={hideSearch} />
          ) : (
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <NavDrawer
                    user={auth.user}
                    signOut={signOut}
                    isDarkTheme={theme.isDarkMode}
                    toggleTheme={theme.toggle}
                  />
                </Box>

                <Typography
                  to="/"
                  component={Link}
                  variant="h6"
                  className={classes.title}
                >
                  DevQuotes
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <IconButton
                    aria-label="search"
                    color="inherit"
                    onClick={showSearch}
                    className={classes.searchIconButton}
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>

                <Button variant="contained">Sign In</Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
