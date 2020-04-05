import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/Auth';
import { ThemeContext } from 'common/Theme';
import Header from './Header';

afterEach(cleanup);

function renderHeader(user) {
  return render(
    <ThemeContext.Provider value={[false, () => {}]}>
      <AuthContext.Provider value={[user]}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

it('renders for anonymous user', () => {
  const { queryByTestId, getByTestId } = renderHeader(null);

  expect(getByTestId('signIn')).toBeTruthy();
  expect(queryByTestId('/favorites/')).toBeNull();

  fireEvent.click(getByTestId('moreOptions'));
  expect(queryByTestId('/createQuote/')).toBeNull();
  expect(queryByTestId('/signOut/')).toBeNull();
});

it('renders for authenticated user', () => {
  const { queryByTestId, getByTestId } = renderHeader({});

  expect(queryByTestId('signIn')).toBeNull();
  expect(getByTestId('favorites')).toBeTruthy();

  fireEvent.click(getByTestId('moreOptions'));
  expect(queryByTestId('/createQuote/')).toBeNull();
  expect(queryByTestId('signOut')).toBeTruthy();
});

it('renders for admin user', () => {
  const { queryByTestId, getByTestId } = renderHeader({ is_admin: true });

  expect(queryByTestId('signIn')).toBeNull();
  expect(getByTestId('favorites')).toBeTruthy();

  fireEvent.click(getByTestId('moreOptions'));
  expect(getByTestId('createQuote')).toBeTruthy();
  expect(getByTestId('signOut')).toBeTruthy();
});
