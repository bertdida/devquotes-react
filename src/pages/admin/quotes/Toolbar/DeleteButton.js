import React from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

export function DeleteButton({ onClick }) {
  return (
    <Tooltip title="Delete selected Quotes">
      <IconButton aria-label="delete selected quotes" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

DeleteButton.propTypes = {
  onClick: Proptypes.func.isRequired,
};
