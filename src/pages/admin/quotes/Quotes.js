import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';

import api from 'common/api';
import { useSnack, actions as snackActions } from 'common/hooks/useSnack';
import { useUserDispatch, actions as userActions } from 'common/hooks/useUser';
import {
  QuotesProvider,
  useQuotesState,
  useQuotesDispatch,
  actions as quotesActions,
} from './QuotesContext';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import { DeleteDialog } from './DeleteDialog';

const { fetchQuotes, deleteQuotes } = api;

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 25;

export function Quotes() {
  const { search } = useLocation();
  const { dispatch: snackDispatch } = useSnack();
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    setQueryParams(search);
  }, [search]);

  return (
    <QuotesProvider>
      <Helmet>
        <title>DevQuotes | Manage Quotes</title>
      </Helmet>

      <MemoizedQuotes queryParams={queryParams} snackDispatch={snackDispatch} />
    </QuotesProvider>
  );
}

const MemoizedQuotes = memo(WrappedQuotes);

function WrappedQuotes({ snackDispatch, queryParams: queryParamsProp }) {
  const [openDialog, setOpenDialog] = useState(false);

  const history = useHistory();
  const userDispatch = useUserDispatch();
  const quotesDispatch = useQuotesDispatch();
  const { quotes, queryParams } = useQuotesState();
  const selected = quotes.filter(quote => quote.isSelected);

  useEffect(() => {
    if (queryParamsProp === undefined) {
      return;
    }

    quotesDispatch({
      type: quotesActions.PARSE_QUERY_PARAMS,
      payload: { params: queryParamsProp },
    });
  }, [quotesDispatch, queryParamsProp]);

  useEffect(() => {
    if (queryParams === null) {
      return;
    }

    quotesDispatch({ type: quotesActions.QUOTES_LOADING });
    const { page = DEFAULT_PAGE, per_page = DEFAULT_PER_PAGE } = queryParams;

    (async () => {
      try {
        const response = await fetchQuotes({ ...queryParams, page, per_page });
        quotesDispatch({
          type: quotesActions.QUOTES_LOADED,
          payload: { response },
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      }
    })();
  }, [quotesDispatch, history, queryParams]);

  async function deleteSelected() {
    const ids = selected.map(quote => quote.id);
    const response = await deleteQuotes(ids);
    const successIds = response.data.reduce((carry, status) => {
      if (status.success !== true) return carry;
      return [...carry, status.id];
    }, []);

    quotesDispatch({
      type: quotesActions.QUOTES_DELETED,
      payload: { ids: successIds },
    });

    snackDispatch({
      type: snackActions.PUSH_SNACK,
      payload: { message: 'Selected Quotes deleted' },
    });

    userDispatch({
      type: userActions.DECREMENT_SUBMITTED,
      payload: { count: successIds.length },
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
