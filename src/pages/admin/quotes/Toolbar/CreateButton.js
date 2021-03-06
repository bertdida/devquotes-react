import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export function CreateButton() {
  return (
    <Tooltip title="Create Quote">
      <IconButton
        component={Link}
        aria-label="create quote"
        to="/admin/quotes/create"
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
