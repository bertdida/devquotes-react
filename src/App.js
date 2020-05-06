import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from './common/Theme';
import { AuthProvider } from './common/Auth';
import Header from './common/Header';
import { NotFoundPage, ForbiddenPage } from './pages/errors';
import { default as ProtectedRoute } from './common/route/Protected';
import { default as AdminRoute } from './common/route/Admin';
import HomeContainer from './pages/home';
import QuoteContainer from './pages/quote';
import QuotesContainer from './pages/quotes';
import FavoritesContainer from './pages/favorites';
import SignIn from './pages/signin';
import FormContainer from './pages/form';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  wrapper: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
    },
    '& > *:first-child': {
      marginTop: 0,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes</title>
      </Helmet>

      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Container maxWidth="md">
              <div className={classes.wrapper}>
                <Switch>
                  <Route exact path="/" component={HomeContainer} />
                  <AdminRoute
                    path="/quotes/:id/edit"
                    component={FormContainer}
                  />
                  <Route path="/signin" component={SignIn} />
                  <Route exact path="/quotes/:id" component={QuoteContainer} />
                  <Route path="/quotes" component={QuotesContainer} />
                  <ProtectedRoute
                    path="/favorites"
                    component={FavoritesContainer}
                  />

                  <AdminRoute path="/create" component={FormContainer} />
                  <Route path="/404" component={NotFoundPage} />
                  <Route path="/403" component={ForbiddenPage} />
                  <Redirect to="/404" />
                </Switch>
              </div>
            </Container>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
