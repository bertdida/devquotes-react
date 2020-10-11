import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

export const useQuotesState = () => useContext(StateContext);
export const useQuotesDispatch = () => useContext(DispatchContext);

const initialState = {
  quotes: [],
  pagination: {},
  isLoading: true,
  queryParams: null,
};

export function QuotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

QuotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
