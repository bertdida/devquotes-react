import React from 'react';
import clsx from 'clsx';
import MuiTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import { EmptyResult } from 'components/EmptyResult';
import { Row } from './Row';
import { useStyles } from './Table.style';
import { useQuotesState, useQuotesDispatch, actions } from '../QuotesContext';

export function Table() {
  const classes = useStyles();
  const { quotes, pagination, isLoading } = useQuotesState();
  const dispatch = useQuotesDispatch();
  const history = useHistory();

  const { location } = history;
  const numSelected = quotes.filter(({ isSelected }) => isSelected).length;
  const numQuotes = quotes.length;

  function toggleSelectAll(event) {
    const { checked } = event.target;
    dispatch({ type: actions[checked ? 'SELECT_ALL' : 'DESELECT_ALL'] });
  }

  function handleChangePage(_, newPage) {
    const query = queryString.parse(location.search);
    const newQuery = { ...query, page: newPage === 0 ? null : newPage + 1 };
    const newQueryString = queryString.stringify(newQuery, { skipNull: true });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.push({ pathname: '/admin/quotes', search: newQueryString });
  }

  if (!isLoading && numQuotes === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={clsx(classes.table, `${classes.table}--withMinHeight`)}
      >
        <EmptyResult />
      </Box>
    );
  }

  return (
    <TableContainer
      className={clsx({
        [classes.table]: true,
        [`${classes.table}--withMinHeight`]: isLoading,
      })}
    >
      <Backdrop open={isLoading} className={`${classes.table}__backdrop`}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
            <TableCell>Quotation</TableCell>
            <Hidden mdDown>
              <TableCell>Author</TableCell>
            </Hidden>
            <TableCell>Actions</TableCell>
          </MuiTableRow>
        </TableHead>

        <TableBody>
          {quotes.map(quote => (
            <Row key={quote.id} quote={quote} />
          ))}
        </TableBody>
      </MuiTable>

      {!isLoading && (
        <TablePagination
          component="div"
          onChangePage={handleChangePage}
          rowsPerPageOptions={[]}
          count={pagination.total}
          page={pagination.curr_page - 1} // zero based
          rowsPerPage={pagination.per_page}
        />
      )}
    </TableContainer>
  );
}
