import React from 'react';
import { createMemoryHistory, createLocation } from 'history'; // eslint-disable-line import/no-extraneous-dependencies
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/hooks/useAuth';
import { Quotes } from './Quotes';

const updatePage = () => {};

const fetchQuotes = () =>
  Promise.resolve({
    data: {
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
    },
  });

it('renders with pagination', async () => {
  const { getByRole } = render(
    <AuthContext.Provider value={{ user: null }}>
      <Quotes
        location={createLocation()}
        history={createMemoryHistory()}
        updatePage={updatePage}
        fetchQuotes={fetchQuotes}
      />
    </AuthContext.Provider>
  );

  await waitForElementToBeRemoved(() =>
    getByRole('alert', { name: /loading/i })
  );

  getByRole('navigation', { name: /pagination/i });
});
