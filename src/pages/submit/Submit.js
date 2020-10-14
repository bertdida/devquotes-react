import React, { useCallback } from 'react';

import { QuoteForm } from 'components/QuoteForm';
import { useSnack, actions } from 'common/hooks/useSnack';
import api from 'common/api';

const { createQuote } = api;

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
