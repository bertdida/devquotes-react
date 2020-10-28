import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import { Spinner } from 'components/Spinner';
import api from 'common/api';

const { fetchQuote, updateQuote } = api;

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export function Edit() {
  const match = useRouteMatch();
  const history = useHistory();
  const { dispatch } = useSnack();
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { params } = match;
  const { id: quoteId } = params;

  useEffect(() => {
    if (!isNumeric(quoteId)) {
      return history.push('/404');
    }

    (async () => {
      try {
        const response = await fetchQuote(quoteId);
        setQuote(response.data.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      }
    })();
  }, [history, quoteId]);

  async function onSubmit(newQuote) {
    const response = await updateQuote(newQuote);
    dispatch({
      type: actions.PUSH_SNACK,
      payload: { message: 'Quote edited' },
    });

    return response;
  }

  if (isLoading) {
    return <Spinner message="Loading Quote..." />;
  }

  return <QuoteForm quote={quote} onSubmit={onSubmit} />;
}
