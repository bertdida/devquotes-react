import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ServiceWorkerProvider } from './common/hooks';

ReactDOM.render(
  <ServiceWorkerProvider>
    <App />
  </ServiceWorkerProvider>,
  document.getElementById('root')
);
