import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Hidden from '@material-ui/core/Hidden';

import { AuthContext } from 'common/Auth';
import MoreOptions from './MoreOptions';
import DrawerNav from './DrawerNav';

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

export default function Header() {
  const classes = useStyles();
  const [user] = useContext(AuthContext);

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
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/quotes">
                Quotes
              </Button>
              <Button color="inherit" component={Link} to="/search">
                Search
              </Button>
              {user ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/favorites"
                  data-testid="favorites"
                >
                  Favorites
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/signin"
                  data-testid="signIn"
                >
                  Sign In
                </Button>
              )}
              <MoreOptions user={user} />
            </Hidden>

            <Hidden mdUp>
              <DrawerNav />
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
