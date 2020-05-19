import React, { useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import * as serviceWorker from '../../serviceWorker';

const ServiceWorkerContext = React.createContext();

export function ServiceWorkerProvider({ children }) {
  const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    serviceWorker.register({
      onUpdate: registration => {
        setWaitingServiceWorker(registration.waiting);
        setIsUpdateAvailable(true);
      },
    });
  }, []);

  useEffect(() => {
    if (waitingServiceWorker === null) {
      return;
    }

    waitingServiceWorker.addEventListener('statechange', event => {
      if (event.target.state === 'activated') {
        window.location.reload();
      }
    });
  }, [waitingServiceWorker]);

  const value = useMemo(
    () => ({
      isUpdateAvailable,
      updateAssets: () => {
        if (waitingServiceWorker) {
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      },
    }),
    [isUpdateAvailable, waitingServiceWorker]
  );

  return (
    <ServiceWorkerContext.Provider
      value={[value.isUpdateAvailable, value.updateAssets]}
    >
      {children}
    </ServiceWorkerContext.Provider>
  );
}

ServiceWorkerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useServiceWorker = () => useContext(ServiceWorkerContext);
