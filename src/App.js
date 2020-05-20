import React, { Suspense, lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { ErrorBoundary } from './common/ErrorBoundary';
import { ThemeProvider } from './common/Theme';
import { AuthProvider } from './common/hooks/useAuth';
import { Header } from './common/Header';
import { AdminRoute, ProtectedRoute } from './common/route';
import { NotFoundPage, ForbiddenPage } from './pages/errors';
import { useServiceWorker } from './common/hooks';

const Home = lazy(() => import('./pages/home'));
const Quote = lazy(() => import('./pages/quote'));
const Quotes = lazy(() => import('./pages/quotes'));
const Search = lazy(() => import('./pages/search'));
const SignIn = lazy(() => import('./pages/signin'));
const Favorites = lazy(() => import('./pages/favorites'));
const Form = lazy(() => import('./pages/form'));

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
  const { isUpdateAvailable, updateAssets } = useServiceWorker();

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
                <Suspense fallback={<p>Loading...</p>}>
                  <ErrorBoundary>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/quotes" component={Quotes} />
                      <Route exact path="/quotes/:id" component={Quote} />
                      <Route path="/search" component={Search} />
                      <Route path="/signin" component={SignIn} />

                      <ProtectedRoute path="/favorites" component={Favorites} />
                      <AdminRoute path="/quotes/:id/edit" component={Form} />
                      <AdminRoute path="/create" component={Form} />

                      <Route path="/404" component={NotFoundPage} />
                      <Route path="/403" component={ForbiddenPage} />
                      <Redirect to="/404" />
                    </Switch>
                  </ErrorBoundary>
                </Suspense>
              </div>
            </Container>
          </BrowserRouter>
        </AuthProvider>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isUpdateAvailable}
          autoHideDuration={6000}
          message="A new version is available."
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={updateAssets}>
                UPDATE
              </Button>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
