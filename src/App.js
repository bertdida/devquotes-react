import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';

import { ThemeProvider } from './common/Theme';
import { AuthProvider } from './common/Auth';
import { Header } from './common/Header';
import { AdminRoute, ProtectedRoute } from './common/route';
import { FavoritesContainer } from './pages/favorites';
import { FormContainer } from './pages/form';
import { HomeContainer } from './pages/home';
import { QuoteContainer } from './pages/quote';
import { QuotesContainer } from './pages/quotes';
import { SearchContainer } from './pages/search';
import { SignIn } from './pages/signin';
import { NotFoundPage, ForbiddenPage } from './pages/errors';

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
            <Container maxWidth="md" component="main" id="maincontent">
              <div className={classes.wrapper}>
                <Switch>
                  <Route exact path="/" component={HomeContainer} />
                  <Route exact path="/quotes" component={QuotesContainer} />
                  <Route exact path="/quotes/:id" component={QuoteContainer} />
                  <Route path="/search" component={SearchContainer} />
                  <Route path="/signin" component={SignIn} />

                  <ProtectedRoute
                    path="/favorites"
                    component={FavoritesContainer}
                  />
                  <AdminRoute
                    path="/quotes/:id/edit"
                    component={FormContainer}
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
