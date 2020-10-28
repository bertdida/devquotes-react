import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
  StateContext as UserContext,
  DispatchContext as UserDispatch,
} from 'common/hooks/useUser';
import { SnackProvider } from 'common/hooks/useSnack';
import { Quote } from './Quote';

const quote = {
  id: 1,
  author: 'Author 1',
  quotation: 'Quotation 1',
};

it('renders quote', () => {
  const user = null;
  const { getByRole, container } = render(
    <SnackProvider>
      <UserDispatch.Provider value={() => {}}>
        <UserContext.Provider value={user}>
          <Quote quote={quote} />
        </UserContext.Provider>
      </UserDispatch.Provider>
    </SnackProvider>
  );

  const root = container.querySelector('blockquote');
  const author = within(root).getByText(quote.author);
  const quotation = within(root).getByText(quote.quotation);

  expect(author.nodeName).toBe('CITE');
  expect(quotation.nodeName).toBe('P');

  getByRole('button', { name: /like quote/i });
  getByRole('button', { name: /share on twitter/i });
  getByRole('button', { name: /share on facebook/i });
  getByRole('button', { name: /copy link/i });
});
