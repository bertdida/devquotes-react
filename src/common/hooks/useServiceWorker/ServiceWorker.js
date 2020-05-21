import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { register } from './register-service-worker';

const ServiceWorkerContext = createContext();

export function ServiceWorkerProvider({ children }) {
  const [waitingServiceWorker, setWaitingServiceWorker] = useState(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    register({
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

  function updateAssets() {
    if (waitingServiceWorker) {
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  return (
    <ServiceWorkerContext.Provider value={{ isUpdateAvailable, updateAssets }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
}

ServiceWorkerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useServiceWorker = () => useContext(ServiceWorkerContext);
