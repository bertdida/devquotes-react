import React, { useCallback } from 'react';

import { QuoteForm } from 'common/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import { createQuote } from './api-calls';

export function Create() {
  const { dispatch } = useSnack();

  const onSubmit = useCallback(
    async newQuote => {
      const response = await createQuote(newQuote);
      dispatch({
        type: actions.PUSH_SNACK,
        payload: { message: 'Quote created.' },
      });

      return response;
    },
    [dispatch]
  );

  return <QuoteForm onSubmit={onSubmit} />;
}
