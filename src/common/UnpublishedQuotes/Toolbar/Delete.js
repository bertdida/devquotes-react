import React, { useState } from 'react';
import Proptypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import { DeleteDialog } from 'common/Quote/DeleteDialog';

export function Delete({ deleteSelected }) {
  const [open, setOpen] = useState(false);

  function onClick() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  return (
    <>
      <Tooltip title="Delete selected Quotes">
        <IconButton aria-label="delete selected quotes" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <DeleteDialog open={open} onClose={onClose} erase={deleteSelected} />
    </>
  );
}

Delete.propTypes = {
  deleteSelected: Proptypes.func.isRequired,
};
