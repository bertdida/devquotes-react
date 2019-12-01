import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { ThemeProvider } from "./components/Theme";
import { AuthProvider, AuthContext } from "./components/Auth";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Signin from "./components/Signin";
import quotes from "./quotes";
import { default as QuoteForm } from "./components/Quote/Form";
import NotFoundPage from "./components/NotFoundPage";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(8)
    }
  },
  wrapper: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3)
    },
    "& > *:first-child": {
      marginTop: 0
    }
  }
}));

function PrivateRoutes() {
  const [user] = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/signin" />;
  }

  return (
    <React.Fragment>
      <Route path="/create-quote" component={QuoteForm} />
      <Route
        path="/favorites"
        render={props => <Feed {...props} data={{ quotes }} />}
      />
    </React.Fragment>
  );
}

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Container maxWidth="md">
            <div className={classes.wrapper}>
              <Switch>
                <Route path="/signin" component={Signin} />
                <Route
                  path="/"
                  exact
                  render={props => <Feed {...props} data={{ quotes }} />}
                />
                <Route
                  path="/quotes/:quoteId"
                  exact
                  render={props => {
                    const quoteId = parseInt(props.match.params.quoteId);
                    const quote = quotes.find(q => q.id === quoteId);
                    return <Feed {...props} data={{ quotes: [quote] }} />;
                  }}
                />
                <PrivateRoutes />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
