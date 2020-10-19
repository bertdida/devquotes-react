import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import api from 'common/api';

const { createQuote } = api;

export function Create() {
  const { dispatch } = useSnack();
  const history = useHistory();

  async function onSubmit(newQuote) {
    const response = await createQuote(newQuote);
    const { data: quote } = response.data;

    const goToQuote = () => {
      history.push(`/quotes/${quote.id}/${quote.slug}`);
      dispatch({ type: actions.CLOSE_CURRENT });
    };

    dispatch({
      type: actions.PUSH_SNACK,
      payload: {
        message: 'Quote created.',
        action: (
          <Button color="secondary" size="small" onClick={goToQuote}>
            View
          </Button>
        ),
      },
    });

    return response;
  }

  return <QuoteForm onSubmit={onSubmit} />;
}
