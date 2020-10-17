import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import api from 'common/api';

const { fetchQuote, updateQuote } = api;

function isNumeric(value) {
  return /^\d+$/.test(value);
}

export function Edit({ match }) {
  const history = useHistory();
  const { dispatch } = useSnack();
  const [quote, setQuote] = useState();

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
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      }
    })();
  }, [history, quoteId]);

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
