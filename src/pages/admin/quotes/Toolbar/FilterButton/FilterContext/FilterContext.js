import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import api from 'common/api';
import initialState from './initialState';
import reducer from './reducer';
import actions from './actions';

const { fetchQuoteStatuses } = api;

export const StateContext = createContext();
export const DispatchContext = createContext();

export const useFilterState = () => useContext(StateContext);
export const useFilterDispatch = () => useContext(DispatchContext);

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { location } = useHistory();
  const { search } = location;

  useEffect(() => {
    (async () => {
      const response = await fetchQuoteStatuses();
      dispatch({ type: actions.QUOTE_STATUSES_LOADED, payload: { response } });
    })();
  }, []);

  useEffect(() => {
    if (state.isLoading) {
      return;
    }

    dispatch({ type: actions.PARSE_QUERY_PARAMS, payload: { params: search } });
  }, [search, state.isLoading]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
