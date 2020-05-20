import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/hooks';
import { QuotesContainer } from './QuotesContainer';

afterEach(cleanup);

const quotes = {
  data: [
    {
      data: {
        id: 1,
        author: 'Author 1',
        quotation: 'Quotation 1',
      },
    },
    {
      data: {
        id: 2,
        author: 'Author 2',
        quotation: 'Quotation 2',
      },
    },
  ],
};

function fetchQuotes() {
  return Promise.resolve({ data: quotes });
}

function updatePage() {}

it('renders with pagination', async () => {
  const { getByTestId } = render(
    <AuthContext.Provider value={{ user: null }}>
      <QuotesContainer
        fetchQuotes={fetchQuotes}
        updatePage={updatePage}
        location={{ search: '' }}
        history={{ listen: () => {} }}
      />
    </AuthContext.Provider>
  );

  expect(getByTestId('skeleton')).toBeTruthy();
  await waitForElementToBeRemoved(() => getByTestId('skeleton'));

  expect(getByTestId('pagination')).toBeTruthy();
});
