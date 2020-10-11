import React, { Suspense, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

import { AuthProvider } from './common/hooks/useAuth';
import { useNetworkStatus } from './common/hooks/useNetworkStatus';
import { useServiceWorker } from './common/hooks/useServiceWorker';
import { useSnack } from './common/hooks/useSnack';
import { Header } from './components/Header';
import { ErrorBoundary } from './common/ErrorBoundary';
import { Routes } from './Routes';

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

export function App() {
  const classes = useStyles();
  const isOnline = useNetworkStatus();
  const snack = useSnack();
  const { isUpdateAvailable, updateAssets } = useServiceWorker();

  useEffect(() => {
    if (isUpdateAvailable) {
      snack.create('A new version is available.', {
        autoHideDuration: null,
        action: function SnackActions() {
          return (
            <Button color="secondary" size="small" onClick={updateAssets}>
              UPDATE
            </Button>
          );
        },
      });
    }
  }, [isUpdateAvailable, snack, updateAssets]);

  useEffect(() => {
    if (!isOnline) {
      snack.create('You are offline.', {
        autoHideDuration: null,
      });
    }
  }, [isOnline, snack]);

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes</title>
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Container maxWidth="md" component="main" id="maincontent">
            <div className={classes.wrapper}>
              <Suspense fallback={<p>Loading...</p>}>
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>
              </Suspense>
            </div>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}
