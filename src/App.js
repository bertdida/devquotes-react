import React, { Suspense, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

import {
  ServiceWorkerProvider,
  useServiceWorker,
} from './common/hooks/useServiceWorker';
import { ThemeProvider } from './common/hooks/useTheme';
import { UserProvider } from './common/hooks/useUser';
import { SnackProvider, useSnack, actions } from './common/hooks/useSnack';
import { useNetworkStatus } from './common/hooks/useNetworkStatus';
import { ErrorBoundary } from './common/ErrorBoundary';
import { Header } from './components/Header';
import { Spinner } from './components/Spinner';
import { Routes } from './Routes';

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
        <UserProvider>
          <BrowserRouter>
            <SnackProvider>
              <WrappedApp />
            </SnackProvider>
          </BrowserRouter>
        </UserProvider>
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
          <Suspense fallback={<Spinner message="Lazy loading..." />}>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Suspense>
        </div>
      </Container>
    </>
  );
}
