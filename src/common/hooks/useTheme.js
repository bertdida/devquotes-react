import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const appTheme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontWeightRegular: 500,
    fontWeightLight: 500,
    fontWeightMedium: 700,
  },
});

const darkTheme = createMuiTheme({
  ...appTheme,
  palette: {
    type: 'dark',
    primary: {
      main: '#333',
    },
  },
});

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState();
  const theme = isDarkTheme ? darkTheme : appTheme;

  useEffect(() => {
    const localTheme = window.localStorage.getItem('dq::theme');
    if (localTheme) {
      setIsDarkTheme(localTheme === 'dark');
    } else {
      setIsDarkTheme(
        window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = isDarkTheme ? 'dark' : 'light';

    const metaTheme = document.head.querySelector('meta[name=theme-color]');
    metaTheme.content = theme.palette.primary.main;
  }, [isDarkTheme, theme]);

  function toggle() {
    setIsDarkTheme(!isDarkTheme);
    window.localStorage.setItem('dq::theme', isDarkTheme ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkTheme, toggle, theme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
