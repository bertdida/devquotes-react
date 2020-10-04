import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { ServiceWorkerProvider } from './common/hooks/useServiceWorker';
import { SnackProvider } from './common/hooks/useSnack';
import { ThemeProvider } from './common/hooks/useTheme';

ReactDOM.render(
  <ServiceWorkerProvider>
    <ThemeProvider>
      <SnackProvider>
        <App />
      </SnackProvider>
    </ThemeProvider>
  </ServiceWorkerProvider>,
  document.getElementById('root')
);
