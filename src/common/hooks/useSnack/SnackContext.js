import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';
import actions from './actions';
import { Snack } from './Snack';

const initialState = { current: null, queue: [] };
export const SnackContext = createContext();
export const useSnack = () => useContext(SnackContext);

export function SnackProvider({ children }) {
  const [{ current }, dispatch] = useReducer(reducer, initialState);

  function onClose(_, reason) {
    if (reason !== 'clickaway') {
      dispatch({ type: actions.CLOSE_CURRENT });
    }
  }

  function openNext() {
    dispatch({ type: actions.OPEN_NEXT });
  }

  return (
    <SnackContext.Provider value={{ dispatch }}>
      {children}
      {current && (
        <Snack
          key={current.id}
          onClose={onClose}
          onExited={openNext}
          {...current}
        />
      )}
    </SnackContext.Provider>
  );
}

SnackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
