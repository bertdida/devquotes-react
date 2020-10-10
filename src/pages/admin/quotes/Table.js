import React from 'react';
import PropTypes from 'prop-types';
import { default as MuiTable } from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { default as MuiTableRow } from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';

import { deleteQuote, updateQuote } from './api-calls';
import { Row } from './Row';
import actions from './actions';

const headCells = [
  { id: 'quotation', label: 'Quotation' },
  { id: 'author', label: 'Author' },
  { id: 'actions', label: 'Actions' },
];

export function Table({ state, dispatch }) {
  const { quotes } = state;
  const numSelected = quotes.filter(({ isSelected }) => isSelected).length;
  const numQuotes = quotes.length;

  function toggleSelectAll(event) {
    const { checked } = event.target;
    dispatch({ type: actions[checked ? 'SELECT_ALL' : 'DESELECT_ALL'] });
  }

  function toggleSelect(quote) {
    dispatch({ type: actions.TOGGLE_SELECT, payload: { id: quote.id } });
  }

  async function eraseQuote({ id }) {
    await deleteQuote(id);
    dispatch({ type: actions.QUOTE_DELETED, payload: { id } });
  }

  async function flagAsSpam({ id }) {
    await updateQuoteStatus({ id, status: 'spam' });
  }

  async function publishQuote({ id }) {
    await updateQuoteStatus({ id, status: 'published' });
  }

  async function updateQuoteStatus({ id, status }) {
    const response = await updateQuote({ id, status });
    dispatch({ type: actions.QUOTE_UPDATED, payload: { response } });
  }

  return (
    <MuiTable>
      <TableHead>
        <MuiTableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < numQuotes}
              checked={numQuotes > 0 && numSelected === numQuotes}
              onChange={toggleSelectAll}
              inputProps={{ 'aria-label': 'select all quotes' }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </MuiTableRow>
      </TableHead>

      <TableBody>
        {quotes.map(quote => (
          <Row
            key={quote.id}
            quote={quote}
            toggleSelect={toggleSelect}
            deleteQuote={eraseQuote}
            publishQuote={publishQuote}
            flagAsSpam={flagAsSpam}
          />
        ))}
      </TableBody>
    </MuiTable>
  );
}

Table.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
