import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';

import {
  QuotesProvider,
  useQuotesState,
  useQuotesDispatch,
  actions,
} from './QuotesContext';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import { fetchQuotes, deleteQuotes } from './api-calls';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 25;

export function Quotes() {
  return (
    <QuotesProvider>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <WrappedQuotes />
    </QuotesProvider>
  );
}

function WrappedQuotes() {
  const history = useHistory();
  const dispatch = useQuotesDispatch();
  const { quotes, queryParams } = useQuotesState();

  useEffect(() => {
    const { search } = history.location;
    dispatch({ type: actions.PARSE_QUERY_PARAMS, payload: { params: search } });
  }, [dispatch, history.location]);

  useEffect(() => {
    if (queryParams === null) return;

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
    const ids = quotes.reduce((carry, quote) => {
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

  return (
    <Paper>
      <Toolbar
        totalSelectedQuotes={quotes.filter(quote => quote.isSelected).length}
        deleteSelected={deleteSelected}
      />
      <Table />
    </Paper>
  );
}
