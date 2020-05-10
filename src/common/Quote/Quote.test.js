import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

import { AuthContext } from 'common/Auth';
import { QuoteContainer } from './QuoteContainer';

afterEach(cleanup);
jest.mock('axios');

const quote = {
  id: 1,
  author: 'Author 1',
  quotation: 'Quotation 1',
};

it('renders semantic html', () => {
  const { getByTestId } = render(
    <AuthContext.Provider value={[null]}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  expect(getByTestId('quote').nodeName).toBe('BLOCKQUOTE');
  expect(getByTestId('author').nodeName).toBe('CITE');
  expect(getByTestId('quotation').nodeName).toBe('P');
  expect(getByTestId('author')).toHaveTextContent(quote.author);
  expect(getByTestId('quotation')).toHaveTextContent(quote.quotation);
});

it('renders actions for user', () => {
  const { getByTestId, queryByTestId } = render(
    <AuthContext.Provider value={[null]}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  expect(queryByTestId('button-edit')).toBeNull();
  expect(queryByTestId('button-delete')).toBeNull();
  expect(queryByTestId('button-menu')).toBeNull();

  expect(getByTestId('button-like')).toBeTruthy();
  expect(getByTestId('button-twiter-share')).toBeTruthy();
  expect(getByTestId('button-facebook-share')).toBeTruthy();
  expect(getByTestId('button-copy-link')).toBeTruthy();
});

it('renders actions for admin', () => {
  const { getByTestId, queryByTestId } = render(
    <AuthContext.Provider value={[{ is_admin: true }]}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  expect(queryByTestId('button-twiter-share')).toBeNull();
  expect(queryByTestId('button-facebook-share')).toBeNull();
  expect(queryByTestId('button-copy-link')).toBeNull();

  expect(getByTestId('button-like')).toBeTruthy();
  expect(getByTestId('button-edit')).toBeTruthy();
  expect(getByTestId('button-delete')).toBeTruthy();
  expect(getByTestId('button-menu')).toBeTruthy();

  fireEvent.click(getByTestId('button-menu'));
  expect(getByTestId('menu-item-twitter-share')).toBeTruthy();
  expect(getByTestId('menu-item-facebook-share')).toBeTruthy();
  expect(getByTestId('menu-item-copy-link')).toBeTruthy();
});

it('renders no actions when deleted', async () => {
  axiosMock.delete.mockResolvedValueOnce({ data: null });

  const { getByTestId, getByText } = render(
    <AuthContext.Provider value={[{ is_admin: true }]}>
      <QuoteContainer quote={quote} />
    </AuthContext.Provider>
  );

  fireEvent.click(getByTestId('button-delete'));
  expect(getByTestId('confirm-delete-dialog')).toBeTruthy();

  fireEvent.click(getByTestId('confirm-delete-button'));
  await waitFor(() => getByText('This quote has been deleted.'));

  expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/quotes/${quote.id}`);
});
