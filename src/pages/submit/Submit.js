import React from 'react';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import api from 'common/api';

const { createQuote } = api;

export function Submit() {
  const { dispatch } = useSnack();

  async function onSubmit(newQuote) {
    const response = await createQuote(newQuote);
    dispatch({
      type: actions.PUSH_SNACK,
      payload: { message: 'Quote submitted.' },
    });

    return response;
  }

  return <QuoteForm onSubmit={onSubmit} />;
}
