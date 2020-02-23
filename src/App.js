import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { ThemeProvider } from "./components/Theme";
import { AuthProvider } from "./components/Auth";
import Header from "./components/Header";
import Signin from "./components/Signin";
import FormContainer from "./components/Quote/FormContainer";
import { default as QuoteForm } from "./components/Quote/Form";
import { NotFoundPage, ForbiddenPage } from "./components/errors";
import FeedContainer from "./components/Feed/FeedContainer";
import SingleContainer from "./components/Feed/SingleContainer";
import { ProtectedRoute } from "./protected.route";
import { AdminRoute } from "./admin.route";

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

const Favorites = props => <FeedContainer {...props} userLikes={true} />;

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
                <Route exact path="/" component={FeedContainer} />
                <Route path="/signin" component={Signin} />
                <Route exact path="/quotes/:id" component={SingleContainer} />
                <ProtectedRoute path="/favorites" component={Favorites} />
                <AdminRoute path="/quotes/:id/edit" component={FormContainer} />
                <AdminRoute path="/create-quote" component={QuoteForm} />

                <Route path="/404" component={NotFoundPage} />
                <Route path="/403" component={ForbiddenPage} />
                <Redirect to="/404" />
              </Switch>
            </div>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
