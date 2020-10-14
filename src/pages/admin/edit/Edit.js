import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import api from 'common/api';

const { fetchQuote, updateQuote } = api;

export function Edit({ match }) {
  const { dispatch } = useSnack();
  const [quote, setQuote] = useState();

  useEffect(() => {
    const quoteId = parseInt(match.params.id);
    if (!Number.isNaN(quoteId)) {
      fetchQuote(quoteId).then(response => {
        setQuote(response.data.data);
      });
    }
  }, [match.params.id]);

  const onSubmit = useCallback(
    async newQuote => {
      const response = await updateQuote(newQuote);
      dispatch({
        type: actions.PUSH_SNACK,
        payload: { message: 'Quote edited.' },
      });

      return response;
    },
    [dispatch]
  );

  return <QuoteForm quote={quote} onSubmit={onSubmit} />;
}

Edit.propTypes = {
  match: PropTypes.object.isRequired,
};
