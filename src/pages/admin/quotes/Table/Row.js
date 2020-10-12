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
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

import { useQuotesDispatch, actions } from '../QuotesContext';
import { deleteQuote } from '../api-calls';
import { useStyles } from './Table.style';
import { DeleteDialog } from '../DeleteDialog';
import { QuoteDialog } from './QuoteDialog';

export function Row({ quote }) {
  const dispatch = useQuotesDispatch();
  const { id, quotation, author, isSelected, isDeleted } = quote;

  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  function toggleSelect() {
    dispatch({ type: actions.TOGGLE_SELECT, payload: { id } });
  }

  async function onConfirmDelete() {
    await deleteQuote(quote.id);
    dispatch({ type: actions.QUOTE_DELETED, payload: { id } });
    setDeleteDialogOpen(true);
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
        <TableCell
          className={`${classes.row}__quotation ${classes.row}__ellipsis`}
          onClick={() => setInfoDialogOpen(true)}
        >
          {quotation}
        </TableCell>
        <Hidden mdDown>
          <TableCell
            className={`${classes.row}__noStretch ${classes.row}__ellipsis`}
          >
            {author}
          </TableCell>
        </Hidden>
        <TableCell className={`${classes.row}__noStretch`}>
          <Tooltip title="Delete Quote">
            <IconButton
              aria-label="delete quote"
              onClick={() => setDeleteDialogOpen(true)}
            >
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
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onOk={onConfirmDelete}
      />

      <QuoteDialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        quote={quote}
      />
    </>
  );
}

Row.propTypes = {
  quote: Proptypes.object.isRequired,
};
