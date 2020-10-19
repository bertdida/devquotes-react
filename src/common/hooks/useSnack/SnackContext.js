import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';

import reducer from './reducer';
import actions from './actions';
import { Snack } from './Snack';

const initialState = { current: null, queue: [] };

const useValue = props => useReducer(props.reducer, props.initialState);
const { Provider, useTracked } = createContainer(useValue);

export function SnackProvider(props) {
  return (
    <Provider reducer={reducer} initialState={initialState}>
      <WrappedSnackProvider {...props} />
    </Provider>
  );
}

function WrappedSnackProvider({ children }) {
  const [{ current }, dispatch] = useTracked();

  function onClose(_, reason) {
    if (reason !== 'clickaway') {
      dispatch({ type: actions.CLOSE_CURRENT });
    }
  }

  function openNext() {
    dispatch({ type: actions.OPEN_NEXT });
  }

  return (
    <>
      {children}
      {current && (
        <Snack
          key={current.id}
          onClose={onClose}
          onExited={openNext}
          {...current}
        />
      )}
    </>
  );
}

WrappedSnackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSnack() {
  const [, dispatch] = useTracked();
  return { dispatch };
}
