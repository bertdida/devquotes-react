import React from 'react';
import { render, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

import { AuthContext } from 'common/hooks/useAuth';
import { QuoteContainer } from './QuoteContainer';

jest.mock('axios');

const REGEX = {
  like: /like quote/i,
  shareTwitter: /share on twitter/i,
  shareFacebook: /share on facebook/i,
  copyLink: /copy link/i,
  edit: /edit quote/i,
  moreMenu: /open more menu/i,
  delete: /open delete confirmation dialog/i,
  deleteTitle: /delete quote?/i,
  deleteConfirm: /yes, delete quote/i,
};

const quote = {
  id: 1,
  author: 'Author 1',
  quotation: 'Quotation 1',
};

function expectNull(node) {
  expect(node).toBeNull();
}

it('renders semantic html', () => {
  const { container } = render(
    <AuthContext.Provider value={{ user: null }}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  const root = container.querySelector('blockquote');
  const author = within(root).getByText(quote.author);
  const quotation = within(root).getByText(quote.quotation);

  expect(author.nodeName).toBe('CITE');
  expect(quotation.nodeName).toBe('P');
});

it('renders actions for user', () => {
  const { getByRole, queryByRole } = render(
    <AuthContext.Provider value={{ user: null }}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  expectNull(queryByRole('button', { name: REGEX.moreMenu }));
  expectNull(queryByRole('menuitem', { name: REGEX.edit }));
  expectNull(queryByRole('menuitem', { name: REGEX.delete }));
  expectNull(queryByRole('menuitem', { name: REGEX.copyLink }));

  getByRole('button', { name: REGEX.like });
  getByRole('button', { name: REGEX.shareTwitter });
  getByRole('button', { name: REGEX.shareFacebook });
  getByRole('button', { name: REGEX.copyLink });
});

it('renders actions for admin', () => {
  const { getByRole, queryByRole } = render(
    <AuthContext.Provider value={{ user: { is_admin: true } }}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  expectNull(queryByRole('button', { name: REGEX.shareTwitter }));
  expectNull(queryByRole('button', { name: REGEX.shareFacebook }));
  expectNull(queryByRole('button', { name: REGEX.copyLink }));

  getByRole('button', { name: REGEX.like });
  getByRole('button', { name: REGEX.edit });
  getByRole('button', { name: REGEX.delete });

  fireEvent.click(getByRole('button', { name: REGEX.moreMenu }));
  getByRole('menuitem', { name: REGEX.shareTwitter });
  getByRole('menuitem', { name: REGEX.shareFacebook });
  getByRole('menuitem', { name: REGEX.copyLink });
});

it('renders no actions when deleted', async () => {
  axiosMock.delete.mockResolvedValueOnce({ data: null });

  const { getByRole, getByText } = render(
    <AuthContext.Provider value={{ user: { is_admin: true } }}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  fireEvent.click(getByRole('button', { name: REGEX.delete }));
  getByRole('dialog', { heading: REGEX.deleteTitle });

  fireEvent.click(getByRole('button', { name: REGEX.deleteConfirm }));
  await waitFor(() => getByText('This quote has been deleted.'));

  expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/quotes/${quote.id}`);
});
