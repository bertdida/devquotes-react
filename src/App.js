import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { ThemeProvider } from "./components/Theme";
import { AuthProvider } from "./components/Auth";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Signin from "./components/Signin";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8)
    }
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Container maxWidth="md" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Feed} />
              <Route path="/signin" component={Signin} />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
