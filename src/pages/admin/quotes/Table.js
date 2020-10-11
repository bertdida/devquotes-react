import React from 'react';
import { default as MuiTable } from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { default as MuiTableRow } from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';

import { Row } from './Row';
import { useQuotesState, useQuotesDispatch, actions } from './QuotesContext';

const headCells = [
  { id: 'quotation', label: 'Quotation' },
  { id: 'author', label: 'Author' },
  { id: 'actions', label: 'Actions' },
];

export function Table() {
  const { quotes } = useQuotesState();
  const dispatch = useQuotesDispatch();
  const numSelected = quotes.filter(({ isSelected }) => isSelected).length;
  const numQuotes = quotes.length;

  function toggleSelectAll(event) {
    const { checked } = event.target;
    dispatch({ type: actions[checked ? 'SELECT_ALL' : 'DESELECT_ALL'] });
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
          <Row key={quote.id} quote={quote} />
        ))}
      </TableBody>
    </MuiTable>
  );
}
