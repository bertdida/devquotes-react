import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import initialState from './initialState';
import reducer from './reducer';
import actions from './actions';

export const StateContext = createContext();
export const DispatchContext = createContext();

export const useFilterState = () => useContext(StateContext);
export const useFilterDispatch = () => useContext(DispatchContext);

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { location } = useHistory();
  const { search } = location;

  useEffect(() => {
    dispatch({ type: actions.PARSE_QUERY_PARAMS, payload: { params: search } });
  }, [search]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
