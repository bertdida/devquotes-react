import React, { useState } from 'react';
import Proptypes from 'prop-types';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import { DeleteDialog } from '../DeleteDialog';
import { useQuotesDispatch, actions } from '../QuotesContext';
import { deleteQuote } from '../api-calls';
import { useStyles } from './Table.style';

export function Row({ quote }) {
  const dispatch = useQuotesDispatch();
  const { id, quotation, author, isSelected, isDeleted } = quote;

  const classes = useStyles();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function toggleSelect() {
    dispatch({ type: actions.TOGGLE_SELECT, payload: { id } });
  }

  function confirmDelete() {
    setIsDeleteDialogOpen(true);
  }

  async function onConfirmDelete() {
    await deleteQuote(quote.id);
    dispatch({ type: actions.QUOTE_DELETED, payload: { id } });
    setIsDeleteDialogOpen(false);
  }

  function onCloseDeleteDialog() {
    setIsDeleteDialogOpen(false);
  }

  function onCheckboxChange() {
    toggleSelect(quote);
  }

  return (
    <>
      <TableRow className={clsx({ [`${classes.row}__disabled`]: isDeleted })}>
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected === true} onChange={onCheckboxChange} />
        </TableCell>
        <TableCell className={`${classes.row}__ellipsis`}>
          {quotation}
        </TableCell>
        <TableCell className={`${classes.row}__noStretch`}>{author}</TableCell>
        <TableCell className={`${classes.row}__noStretch`}>
          <Tooltip title="Delete Quote">
            <IconButton aria-label="delete quote" onClick={confirmDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Quote">
            <IconButton
              aria-label="edit quote"
              component={Link}
              to={`/admin/quotes/${quote.id}/edit`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onOk={onConfirmDelete}
      />
    </>
  );
}

Row.propTypes = {
  quote: Proptypes.object.isRequired,
};
