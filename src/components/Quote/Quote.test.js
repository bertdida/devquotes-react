import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/hooks/useAuth';
import { SnackProvider } from 'common/hooks/useSnack';
import { Quote } from './Quote';

const quote = {
  id: 1,
  author: 'Author 1',
  quotation: 'Quotation 1',
};

it('renders quote', () => {
  const { getByRole, container } = render(
    <SnackProvider>
      <AuthContext.Provider value={{ user: null }}>
        <Quote quote={quote} />
      </AuthContext.Provider>
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
