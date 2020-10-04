import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

let uniqueId = 0;
const SnackContext = createContext();

function RenderSnack({ id, message, autoHideDuration = 1000, ...rest }) {
  const messageId = `message-${id}`;

  return (
    <Snackbar
      {...rest}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      ContentProps={{
        'aria-describedby': messageId,
      }}
      autoHideDuration={autoHideDuration}
      TransitionComponent={Slide}
      message={<span id={messageId}>{message}</span>}
    />
  );
}

RenderSnack.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
};

export function SnackProvider({ children }) {
  const [{ current, queue }, setState] = useState({ current: null, queue: [] });

  function create(message, options) {
    uniqueId += 1;
    const id = uniqueId;
    const snack = { id, message, open: true, options };

    if (current) {
      setState({ current, queue: [...queue, snack] });
    } else {
      setState({ current: snack, queue });
    }

    return id;
  }

  function onClose() {
    setState(currentState => ({
      ...currentState,
      current: { ...currentState.current, open: false },
    }));

    setTimeout(openNext, 100);
  }

  function openNext() {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) });
    } else {
      setState({ current: null, queue: [] });
    }
  }

  return (
    <SnackContext.Provider value={{ create }}>
      {children}
      {current && (
        <RenderSnack key={current.id} {...current} onClose={onClose} />
      )}
    </SnackContext.Provider>
  );
}

SnackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSnack = () => useContext(SnackContext);
