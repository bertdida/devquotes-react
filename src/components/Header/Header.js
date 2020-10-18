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

import { NavDrawer } from './NavDrawer';
import { SearchField } from './SearchField';

const useStyles = makeStyles(theme => ({
  title: {
    textDecoration: 'none',
    [theme.breakpoints.down('330')]: {
      display: 'none',
    },
  },
  searchIconButton: {
    padding: theme.spacing(1),
  },
}));

export function Header() {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            position="relative" // SearchField is absolute positioned on mobile
          >
            <Box display="flex" alignItems="center" marginRight="auto">
              <NavDrawer />
              <Box marginLeft={1}>
                <Typography
                  to="/"
                  component={Link}
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                >
                  DevQuotes
                </Typography>
              </Box>
            </Box>

            <SearchField />
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
