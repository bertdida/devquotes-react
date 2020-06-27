import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

import { AuthProvider } from './common/hooks/useAuth';
import { ThemeProvider } from './common/hooks/useTheme';
import { useNetworkStatus } from './common/hooks/useNetworkStatus';
import { useServiceWorker } from './common/hooks/useServiceWorker';
import { Snackbar } from './common/hooks/useSnackbar';
import { Header } from './common/Header';
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
                    <Routes />
                  </ErrorBoundary>
                </Suspense>
              </div>
            </Container>
          </BrowserRouter>
        </AuthProvider>

        <Snackbar
          open={isUpdateAvailable}
          autoHideDuration={null}
          message="A new version is available."
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={updateAssets}>
                UPDATE
              </Button>
            </React.Fragment>
          }
        />

        <Snackbar
          open={!isOnline}
          autoHideDuration={null}
          message="You are offline."
        />
      </ThemeProvider>
    </React.Fragment>
  );
}
