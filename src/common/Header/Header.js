import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Hidden from '@material-ui/core/Hidden';

import { AuthContext } from 'common/Auth';
import { ThemeContext } from 'common/Theme';
import { app } from 'common/firebase';
import { NavDrawer } from './NavDrawer';
import { NavTop } from './NavTop';
import * as api from './api-calls';

const useStyles = makeStyles({
  title: {
    marginRight: 'auto',
    color: 'inherit',
    textDecoration: 'none',
  },
});

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
  const [user] = useContext(AuthContext);
  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);

  async function signOut() {
    await api.signOut();
    await app.auth().signOut();
  }

  return (
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="md">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              to="/"
              component={Link}
            >
              DevQuotes
            </Typography>

            <Hidden smDown>
              <NavTop
                user={user}
                signOut={signOut}
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
              />
            </Hidden>

            <Hidden mdUp>
              <NavDrawer
                user={user}
                signOut={signOut}
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
              />
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
