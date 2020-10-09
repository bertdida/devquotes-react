import React, { useCallback } from 'react';

import { QuoteForm } from 'common/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import { createQuote } from './api-calls';

export function Submit() {
  const { dispatch } = useSnack();

  const onSubmit = useCallback(
    async newQuote => {
      const response = await createQuote(newQuote);
      dispatch({
        type: actions.PUSH_SNACK,
        payload: { message: 'Quote submitted.' },
      });

      return response;
    },
    [dispatch]
  );

  return <QuoteForm onSubmit={onSubmit} />;
}
