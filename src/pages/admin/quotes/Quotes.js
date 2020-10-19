import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import { useHistory, useLocation } from 'react-router-dom';

import { useSnack, actions as snackActions } from 'common/hooks/useSnack';
import api from 'common/api';
import {
  QuotesProvider,
  useQuotesState,
  useQuotesDispatch,
  actions,
} from './QuotesContext';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import { DeleteDialog } from './DeleteDialog';

const { fetchQuotes, deleteQuotes } = api;

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 25;

export function Quotes() {
  const { dispatch } = useSnack();
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    setQueryParams(search);
  }, [search]);

  return (
    <QuotesProvider>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <MemoizedQuotes queryParams={queryParams} snackDispatch={dispatch} />
    </QuotesProvider>
  );
}

const MemoizedQuotes = memo(WrappedQuotes);

function WrappedQuotes({ snackDispatch, queryParams: queryParamsProp }) {
  const [openDialog, setOpenDialog] = useState(false);

  const history = useHistory();
  const dispatch = useQuotesDispatch();
  const { quotes, queryParams } = useQuotesState();
  const selected = quotes.filter(quote => quote.isSelected);

  useEffect(() => {
    if (queryParamsProp === undefined) {
      return;
    }

    dispatch({
      type: actions.PARSE_QUERY_PARAMS,
      payload: { params: queryParamsProp },
    });
  }, [dispatch, queryParamsProp]);

  useEffect(() => {
    if (queryParams === null) {
      return;
    }

    dispatch({ type: actions.QUOTES_LOADING });
    const { page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE } = queryParams;

    (async () => {
      try {
        const response = await fetchQuotes({ ...queryParams, page, per_page });
        dispatch({ type: actions.QUOTES_LOADED, payload: { response } });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      }
    })();
  }, [dispatch, history, queryParams]);

  async function deleteSelected() {
    const ids = selected.map(quote => quote.id);
    const response = await deleteQuotes(ids);
    const successIds = response.data.reduce((carry, status) => {
      if (status.success !== true) return carry;
      return [...carry, status.id];
    }, []);

    dispatch({ type: actions.QUOTES_DELETED, payload: { ids: successIds } });
    snackDispatch({
      type: snackActions.PUSH_SNACK,
      payload: { message: 'Selected Quotes deleted' },
    });
  }

  return (
    <>
      <Paper>
        <Toolbar
          totalSelectedQuotes={selected.length}
          confirmDelete={() => setOpenDialog(true)}
        />
        <Table />
      </Paper>

      <DeleteDialog
        open={openDialog}
        onOk={deleteSelected}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

WrappedQuotes.propTypes = {
  snackDispatch: PropTypes.func.isRequired,
  queryParams: PropTypes.string,
};
