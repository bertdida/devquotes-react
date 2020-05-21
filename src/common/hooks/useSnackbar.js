import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiSnackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function useSnackbar() {
  const [isShown, setIsShown] = useState(false);

  function show() {
    setIsShown(true);
  }

  function onClose(_, reason) {
    if (reason !== 'clickaway') {
      setIsShown(false);
    }
  }

  return { isShown, show, onClose };
}

function Snackbar({ message, autoHideDuration = 1000, ...props }) {
  return (
    <MuiSnackbar
      {...props}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      TransitionComponent={Slide}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
};

export { useSnackbar, Snackbar };
