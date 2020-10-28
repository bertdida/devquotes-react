import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
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

import api from 'common/api';
import { useSnack, actions as snackActions } from 'common/hooks/useSnack';
import { useUserDispatch, actions as userActions } from 'common/hooks/useUser';
import { useQuotesDispatch, actions as quotesActions } from '../QuotesContext';
import { useStyles } from './Table.style';
import { DeleteDialog } from '../DeleteDialog';
import { QuoteDialog } from './QuoteDialog';

const { deleteQuote } = api;

export function Row(props) {
  const { dispatch: snackDispatch } = useSnack();
  return <MemoizedRow snackDispatch={snackDispatch} {...props} />;
}

const MemoizedRow = memo(WrappedRow);

function WrappedRow({ quote, snackDispatch }) {
  const userDispatch = useUserDispatch();
  const quotesDispatch = useQuotesDispatch();
  const { id, quotation, author, isSelected, isDeleted } = quote;

  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  function toggleSelect() {
    quotesDispatch({ type: quotesActions.TOGGLE_SELECT, payload: { id } });
  }

  async function onConfirmDelete() {
    await deleteQuote(quote.id);
    setDeleteDialogOpen(true);

    quotesDispatch({
      type: quotesActions.QUOTE_DELETED,
      payload: { id },
    });

    snackDispatch({
      type: snackActions.PUSH_SNACK,
      payload: { message: 'Quote deleted' },
    });

    userDispatch({
      type: userActions.DECREMENT_SUBMITTED,
    });
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

WrappedRow.propTypes = {
  quote: PropTypes.object.isRequired,
  snackDispatch: PropTypes.func.isRequired,
};
