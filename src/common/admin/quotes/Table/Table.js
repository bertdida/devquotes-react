import React, { useReducer, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { default as MuiTable } from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import { default as MuiTableRow } from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { deleteQuote } from 'common/Quote/api-calls';
import { useSnackbar, Snackbar } from 'common/hooks/useSnackbar';
import { updateQuote, fetchQuotes, deleteQuotes } from './api-calls';
import { Row } from './Row';
import { Toolbar } from './Toolbar';
import actions from './actions';
import reducer from './reducer';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 25;

const useStyles = makeStyles(theme => ({
  tableContainer: {
    position: 'relative',
    minHeight: 400,
  },
  backdrop: {
    position: 'absolute',
    top: theme.spacing(7),
    zIndex: 1,
    alignItems: 'initial',
    paddingTop: theme.spacing(5),
    backgroundColor: 'rgb(255 255 255 / 50%)',
  },
}));

const headCells = [
  { id: 'quotation', label: 'Quotation' },
  { id: 'author', label: 'Author' },
  { id: 'actions', label: 'Actions' },
];

const initialState = {
  quotes: [],
  pagination: {},
  isLoading: true,
  queryParams: null,
};

export function Table() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteSnackbar = useSnackbar(false);
  const deleteMultiSnackbar = useSnackbar(false);
  const updateSnackbar = useSnackbar(false);

  const classes = useStyles();
  const history = useHistory();

  const { location } = history;
  const { search } = location;

  useEffect(() => {
    dispatch({ type: actions.PARSE_QUERY_PARAMS, payload: { params: search } });
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    const queryParams = state.queryParams;
    if (queryParams === null) {
      return;
    }

    dispatch({ type: actions.QUOTES_LOADING });
    const { page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE } = queryParams;

    fetchQuotes({ ...queryParams, page, per_page })
      .then(response => {
        dispatch({ type: actions.QUOTES_LOADED, payload: { response } });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [history, state.queryParams]);

  function toggleSelectAll(event) {
    const { checked } = event.target;
    dispatch({ type: actions[checked ? 'SELECT_ALL' : 'DESELECT_ALL'] });
  }

  function toggleSelect(quote) {
    dispatch({ type: actions.TOGGLE_SELECT, payload: { id: quote.id } });
  }

  async function deleteSelected() {
    const ids = state.quotes.reduce((carry, quote) => {
      if (!quote.isSelected) return carry;
      return [...carry, quote.id];
    }, []);

    const response = await deleteQuotes(ids);
    const successIds = response.data.reduce((carry, status) => {
      if (status.success !== true) return carry;
      return [...carry, status.id];
    }, []);

    dispatch({ type: actions.QUOTES_DELETED, payload: { ids: successIds } });
    deleteMultiSnackbar.show();
  }

  async function eraseQuote({ id }) {
    await deleteQuote(id);
    dispatch({ type: actions.QUOTE_DELETED, payload: { id } });
    deleteSnackbar.show();
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
    updateSnackbar.show();
  }

  function handleChangePage(_, newPage) {
    const query = queryString.parse(location.search);
    const newQuery = { ...query, page: newPage === 0 ? null : newPage + 1 };
    const newQueryString = queryString.stringify(newQuery, { skipNull: true });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.push({ pathname: '/admin/quotes', search: newQueryString });
  }

  const { quotes, pagination, isLoading } = state;
  const numSelected = quotes.filter(({ isSelected }) => isSelected).length;
  const numQuotes = quotes.length;

  return (
    <Paper>
      <Toolbar
        totalSelectedQuotes={numSelected}
        deleteSelected={deleteSelected}
      />

      <TableContainer className={classes.tableContainer}>
        <Backdrop open={isLoading} className={classes.backdrop}>
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
              {headCells.map(headCell => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
            </MuiTableRow>
          </TableHead>

          <TableBody>
            {quotes.map(quote => (
              <Row
                key={quote.id}
                toggleSelect={toggleSelect}
                quote={quote}
                deleteQuote={eraseQuote}
                publishQuote={publishQuote}
                flagAsSpam={flagAsSpam}
              />
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

      <Snackbar
        open={deleteMultiSnackbar.isShown}
        onClose={deleteMultiSnackbar.onClose}
        message="Quotes deleted."
      />

      <Snackbar
        open={deleteSnackbar.isShown}
        onClose={deleteSnackbar.onClose}
        message="Quote deleted."
      />

      <Snackbar
        open={updateSnackbar.isShown}
        onClose={updateSnackbar.onClose}
        message="Quote updated."
      />
    </Paper>
  );
}
