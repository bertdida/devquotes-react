import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useAuth } from 'common/hooks/useAuth';
import { NavDrawer } from './NavDrawer';
import { SearchField } from './SearchField';

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
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            position="relative"
          >
            <Box display="flex" alignItems="center" marginRight="auto">
              <NavDrawer />
              <Box marginLeft={1}>
                <Typography
                  to="/"
                  component={Link}
                  variant="h6"
                  className={classes.title}
                >
                  DevQuotes
                </Typography>
              </Box>
            </Box>

            <SearchField />

            {!user && (
              <Box marginLeft={1}>
                <Button component={Link} to="/signin" color="inherit">
                  Sign In
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
