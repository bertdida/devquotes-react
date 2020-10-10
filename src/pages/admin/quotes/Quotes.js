import React, { useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { fetchQuotes, deleteQuotes } from './api-calls';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
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

const initialState = {
  quotes: [],
  pagination: {},
  isLoading: true,
  queryParams: null,
};

export function Quotes() {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <Paper>
        <Toolbar
          totalSelectedQuotes={numSelected}
          deleteSelected={deleteSelected}
        />

        <TableContainer className={classes.tableContainer}>
          <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <Table state={state} dispatch={dispatch} />

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
      </Paper>
    </>
  );
}
