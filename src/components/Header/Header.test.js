import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthContext } from 'common/hooks/useAuth';
import { ThemeContext } from 'common/hooks/useTheme';
import { Header } from './Header';

const RE_PATTERN = {
  mainNav: /open main navigation/i,
  home: /home/i,
  quotes: /^quotes/i,
  favorites: /favorites/i,
  signIn: /sign in/i,
  signOut: /sign out/i,
  toggleTheme: /dark theme: on|off/i,
  createQuote: /create quote/i,
  manageQuotes: /manage quotes/i,
  submitQuote: /submit quote/i,
};

function renderHeader(user) {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <ThemeContext.Provider value={{ isDarkMode: false, toggle: () => {} }}>
          <Header />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

function expectNull(node) {
  expect(node).toBeNull();
}

it('renders nav items for anonymous user', () => {
  const { getByRole, queryByRole } = renderHeader(null);

  fireEvent.click(getByRole('button', { name: RE_PATTERN.mainNav }));

  getByRole('button', { name: RE_PATTERN.home });
  getByRole('button', { name: RE_PATTERN.quotes });
  getByRole('button', { name: RE_PATTERN.favorites });
  getByRole('button', { name: RE_PATTERN.signIn });
  getByRole('button', { name: RE_PATTERN.toggleTheme });
  getByRole('button', { name: RE_PATTERN.submitQuote });

  expectNull(queryByRole('button', { name: RE_PATTERN.createQuote }));
  expectNull(queryByRole('button', { name: RE_PATTERN.manageQuotes }));
  expectNull(queryByRole('button', { name: RE_PATTERN.signOut }));
});

it('renders nav items for authenticated user', () => {
  const { getByRole, queryByRole } = renderHeader({ is_admin: false });

  fireEvent.click(getByRole('button', { name: RE_PATTERN.mainNav }));

  getByRole('button', { name: RE_PATTERN.home });
  getByRole('button', { name: RE_PATTERN.quotes });
  getByRole('button', { name: RE_PATTERN.favorites });
  getByRole('button', { name: RE_PATTERN.signOut });
  getByRole('button', { name: RE_PATTERN.toggleTheme });
  getByRole('button', { name: RE_PATTERN.submitQuote });

  expectNull(queryByRole('button', { name: RE_PATTERN.createQuote }));
  expectNull(queryByRole('button', { name: RE_PATTERN.manageQuotes }));
  expectNull(queryByRole('button', { name: RE_PATTERN.signIn }));
});

it('renders nav items for admin user', () => {
  const { getByRole, queryByRole } = renderHeader({ is_admin: true });

  fireEvent.click(getByRole('button', { name: RE_PATTERN.mainNav }));

  getByRole('button', { name: RE_PATTERN.home });
  getByRole('button', { name: RE_PATTERN.quotes });
  getByRole('button', { name: RE_PATTERN.favorites });
  getByRole('button', { name: RE_PATTERN.signOut });
  getByRole('button', { name: RE_PATTERN.toggleTheme });
  getByRole('button', { name: RE_PATTERN.createQuote });
  getByRole('button', { name: RE_PATTERN.manageQuotes });

  expectNull(queryByRole('button', { name: RE_PATTERN.submitQuote }));
  expectNull(queryByRole('button', { name: RE_PATTERN.signIn }));
});
