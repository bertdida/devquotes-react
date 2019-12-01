import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import MoreOptions from "./MoreOptions";
import { AuthContext } from "../Auth";

const useStyles = makeStyles({
  title: {
    marginRight: "auto",
    color: "inherit",
    textDecoration: "none"
  }
});

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
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
              Devquotes
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {user ? (
              <Button color="inherit" component={Link} to="/favorites">
                Favorites
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/signin">
                Sign In
              </Button>
            )}
            <MoreOptions user={user} />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
