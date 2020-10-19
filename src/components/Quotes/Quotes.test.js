import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/hooks/useAuth';
import { SnackProvider } from 'common/hooks/useSnack';
import { Quotes } from './Quotes';

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

it('renders quotes', async () => {
  window.scrollTo = jest.fn();

  const { getByRole } = render(
    <BrowserRouter>
      <SnackProvider>
        <AuthContext.Provider value={{ user: null }}>
          <Quotes fetchQuotes={fetchQuotes} />
        </AuthContext.Provider>
      </SnackProvider>
    </BrowserRouter>
  );

  await waitForElementToBeRemoved(() =>
    getByRole('alert', { name: /loading/i })
  );

  getByRole('navigation', { name: /pagination/i });
});
