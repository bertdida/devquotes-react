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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import { DeleteDialog } from './DeleteDialog';
import { useQuotesDispatch, actions } from './QuotesContext';
import { deleteQuote, updateQuote } from './api-calls';
import { useStyles } from './Quotes.style';

export function Row({ quote }) {
  const dispatch = useQuotesDispatch();
  const { id, quotation, author, status, isSelected, isDeleted } = quote;
  const isPublished = status === 'published';

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

          {!isPublished && <MoreOptions quote={quote} />}
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

function MoreOptions({ quote }) {
  const dispatch = useQuotesDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function flagAsSpam() {
    await updateQuoteStatus('spam');
  }

  async function publishQuote() {
    await updateQuoteStatus('published');
  }

  async function updateQuoteStatus(status) {
    const response = await updateQuote({ id: quote.id, status });
    dispatch({ type: actions.QUOTE_UPDATED, payload: { response } });
  }

  return (
    <>
      <Tooltip title="More options">
        <IconButton aria-label="more options" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={publishQuote}>Publish Quote</MenuItem>
        <MenuItem onClick={flagAsSpam}>Flag as spam</MenuItem>
      </Menu>
    </>
  );
}

MoreOptions.propTypes = {
  quote: Proptypes.object.isRequired,
};
