import React, { Suspense, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

import { AuthProvider } from './common/hooks/useAuth';
import { useNetworkStatus } from './common/hooks/useNetworkStatus';
import {
  useServiceWorker,
  ServiceWorkerProvider,
} from './common/hooks/useServiceWorker';
import { actions, useSnack, SnackProvider } from './common/hooks/useSnack';
import { Header } from './components/Header';
import { ErrorBoundary } from './common/ErrorBoundary';
import { Routes } from './Routes';
import { ThemeProvider } from './common/hooks/useTheme';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(2),
    '& > *:first-child': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
    },
  },
}));

export function App() {
  return (
    <ServiceWorkerProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <SnackProvider>
              <WrappedApp />
            </SnackProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ServiceWorkerProvider>
  );
}

function WrappedApp() {
  const classes = useStyles();
  const isOnline = useNetworkStatus();
  const { dispatch } = useSnack();
  const { isUpdateAvailable, updateAssets } = useServiceWorker();

  useEffect(() => {
    if (isUpdateAvailable) {
      dispatch({
        type: actions.PUSH_SNACK,
        payload: {
          message: 'A new version is available',
          autoHideDuration: null,
          action: (
            <Button color="secondary" size="small" onClick={updateAssets}>
              Update
            </Button>
          ),
        },
      });
    }
  }, [dispatch, isUpdateAvailable, updateAssets]);

  useEffect(() => {
    if (!isOnline) {
      dispatch({
        type: actions.PUSH_SNACK,
        payload: { message: 'You are offline', autoHideDuration: null },
      });
    }
  }, [dispatch, isOnline]);

  return (
    <>
      <Helmet>
        <title>DevQuotes</title>
      </Helmet>

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
    </>
  );
}
