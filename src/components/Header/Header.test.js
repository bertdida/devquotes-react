import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mediaQuery from 'css-mediaquery';
import { createMuiTheme } from '@material-ui/core/styles';

import { AuthContext } from 'common/hooks/useAuth';
import { ThemeContext } from 'common/hooks/useTheme';
import { Header } from './Header';

const REGEX = {
  home: /home/i,
  quotes: /quotes/i,
  search: /search/i,
  favorites: /favorites/i,
  toggleTheme: /dark theme: on|off/i,
  createQuote: /create quote/i,
  signIn: /sign in/i,
  signOut: /sign out/i,
  moreMenu: /open more menu/i,
  mainNav: /open main navigation/i,
};

const { breakpoints } = createMuiTheme();

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

function renderHeader(user) {
  return render(
    <ThemeContext.Provider value={{ isDarkMode: false, toggle: () => {} }}>
      <AuthContext.Provider value={{ user }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

function expectNull(node) {
  expect(node).toBeNull();
}

describe('Medium to large screen', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(breakpoints.values.md);
  });

  it('renders for anonymous user', () => {
    const { getByRole, queryByRole } = renderHeader(null);

    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });

    getByRole('button', { name: REGEX.signIn });
    expectNull(queryByRole('button', { name: REGEX.favorites }));

    fireEvent.click(getByRole('button', { name: REGEX.moreMenu }));
    getByRole('menuitem', { name: REGEX.toggleTheme });
    expectNull(queryByRole('menuitem', { name: REGEX.createQuote }));
    expectNull(queryByRole('menuitem', { name: REGEX.signOut }));
  });

  it('renders for authenticated user', () => {
    const { getByRole, queryByRole } = renderHeader({ is_admin: false });

    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });

    expectNull(queryByRole('button', { name: REGEX.signIn }));
    getByRole('button', { name: REGEX.favorites });

    fireEvent.click(getByRole('button', { name: REGEX.moreMenu }));
    getByRole('menuitem', { name: REGEX.toggleTheme });
    expectNull(queryByRole('menuitem', { name: REGEX.createQuote }));
    getByRole('menuitem', { name: REGEX.signOut });
  });

  it('renders for admin user', () => {
    const { getByRole, queryByRole } = renderHeader({ is_admin: true });

    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });

    expectNull(queryByRole('button', { name: REGEX.signIn }));
    getByRole('button', { name: REGEX.favorites });

    fireEvent.click(getByRole('button', { name: REGEX.moreMenu }));
    getByRole('menuitem', { name: REGEX.toggleTheme });
    getByRole('menuitem', { name: REGEX.createQuote });
    getByRole('menuitem', { name: REGEX.signOut });
  });
});

describe('Small to  medium screen', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(breakpoints.values.sm);
  });

  it('renders for anonymous user', () => {
    const { getByRole, queryByRole } = renderHeader(null);

    fireEvent.click(getByRole('button', { name: REGEX.mainNav }));
    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });
    getByRole('button', { name: REGEX.toggleTheme });

    getByRole('button', { name: REGEX.signIn });

    expectNull(queryByRole('button', { name: REGEX.favorites }));
    expectNull(queryByRole('button', { name: REGEX.createQuote }));
    expectNull(queryByRole('button', { name: REGEX.signOut }));
  });

  it('renders for authenticated user', () => {
    const { getByRole, queryByRole } = renderHeader({ is_admin: false });

    fireEvent.click(getByRole('button', { name: REGEX.mainNav }));
    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });
    getByRole('button', { name: REGEX.toggleTheme });

    expectNull(queryByRole('button', { name: REGEX.signIn }));

    getByRole('button', { name: REGEX.favorites });
    expectNull(queryByRole('button', { name: REGEX.createQuote }));
    getByRole('button', { name: REGEX.signOut });
  });

  it('renders for admin user', () => {
    const { getByRole, queryByRole } = renderHeader({ is_admin: true });

    fireEvent.click(getByRole('button', { name: REGEX.mainNav }));
    getByRole('button', { name: REGEX.home });
    getByRole('button', { name: REGEX.quotes });
    getByRole('button', { name: REGEX.search });
    getByRole('button', { name: REGEX.toggleTheme });

    expectNull(queryByRole('button', { name: REGEX.signIn }));

    getByRole('button', { name: REGEX.favorites });
    getByRole('button', { name: REGEX.createQuote });
    getByRole('button', { name: REGEX.signOut });
  });
});
