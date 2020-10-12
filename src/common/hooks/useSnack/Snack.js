import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export function Snack({ id, message, autoHideDuration = 3000, ...rest }) {
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

Snack.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
};
