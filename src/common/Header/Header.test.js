import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mediaQuery from 'css-mediaquery';
import { createMuiTheme } from '@material-ui/core/styles';

import { AuthContext } from 'common/hooks/useAuth';
import { ThemeContext } from 'common/Theme';
import { Header } from './Header';

afterEach(cleanup);

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
    <ThemeContext.Provider value={[false, () => {}]}>
      <AuthContext.Provider value={{ user }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

describe('Medium to large screen', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(breakpoints.values.md);
  });

  it('renders for anonymous user', () => {
    const { queryByTestId, getByTestId } = renderHeader(null);

    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();

    expect(getByTestId('signin-link')).toBeTruthy();
    expect(queryByTestId('/favorites-link/')).toBeNull();

    fireEvent.click(getByTestId('options-toggle'));
    expect(getByTestId('theme-toggle')).toBeTruthy();
    expect(queryByTestId('/create-quote-link/')).toBeNull();
    expect(queryByTestId('/signout-link/')).toBeNull();
  });

  it('renders for authenticated user', () => {
    const { queryByTestId, getByTestId } = renderHeader({});

    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();

    expect(queryByTestId('signin-link')).toBeNull();
    expect(getByTestId('favorites-link')).toBeTruthy();

    fireEvent.click(getByTestId('options-toggle'));
    expect(queryByTestId('/create-quote-link/')).toBeNull();
    expect(queryByTestId('signout-link')).toBeTruthy();
  });

  it('renders for admin user', () => {
    const { queryByTestId, getByTestId } = renderHeader({ is_admin: true });

    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();

    expect(queryByTestId('signin-link')).toBeNull();
    expect(getByTestId('favorites-link')).toBeTruthy();

    fireEvent.click(getByTestId('options-toggle'));
    expect(getByTestId('create-quote-link')).toBeTruthy();
    expect(getByTestId('signout-link')).toBeTruthy();
  });
});

describe('Small to  medium screen', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(breakpoints.values.sm);
  });

  it('renders for anonymous user', () => {
    const { queryByTestId, getByTestId } = renderHeader(null);

    fireEvent.click(getByTestId('drawer-toggle'));
    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();
    expect(getByTestId('theme-toggle')).toBeTruthy();

    expect(getByTestId('signin-link')).toBeTruthy();

    expect(queryByTestId('/favorites-link/')).toBeNull();
    expect(queryByTestId('/create-quote-link/')).toBeNull();
    expect(queryByTestId('/signout-link/')).toBeNull();
  });

  it('renders for authenticated user', () => {
    const { queryByTestId, getByTestId } = renderHeader({});

    fireEvent.click(getByTestId('drawer-toggle'));
    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();
    expect(getByTestId('theme-toggle')).toBeTruthy();

    expect(queryByTestId('signin-link')).toBeNull();

    expect(getByTestId('favorites-link')).toBeTruthy();
    expect(queryByTestId('/create-quote-link/')).toBeNull();
    expect(queryByTestId('signout-link')).toBeTruthy();
  });

  it('renders for admin user', () => {
    const { queryByTestId, getByTestId } = renderHeader({ is_admin: true });

    fireEvent.click(getByTestId('drawer-toggle'));
    expect(getByTestId('home-link')).toBeTruthy();
    expect(getByTestId('quotes-link')).toBeTruthy();
    expect(getByTestId('search-link')).toBeTruthy();
    expect(getByTestId('theme-toggle')).toBeTruthy();

    expect(queryByTestId('signin-link')).toBeNull();

    expect(getByTestId('favorites-link')).toBeTruthy();
    expect(getByTestId('create-quote-link')).toBeTruthy();
    expect(getByTestId('signout-link')).toBeTruthy();
  });
});
