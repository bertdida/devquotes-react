import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import MoreOptions from "./MoreOptions";

const useStyles = makeStyles({
  title: {
    marginRight: "auto"
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
  const user = true;

  return (
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="sm">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Devquotes
            </Typography>
            <Button color="inherit">Home</Button>
            {user ? <Button color="inherit">Favorites</Button> : null}
            {!user ? <Button color="inherit">Sign In</Button> : null}
            <MoreOptions user={user} />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;
