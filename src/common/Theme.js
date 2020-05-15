import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { teal, deepPurple } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme();

const darkTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: teal.A400,
    },
    background: {
      paper: '#333',
      default: '#292929',
    },
  },
};

const lightTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: deepPurple.A200,
    },
    background: {
      default: '#f5f5f5',
    },
  },
};

const appTheme = {
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      md: 800,
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontWeightRegular: 500,
    fontWeightLight: 500,
    fontWeightMedium: 700,
  },
  ...darkTheme,
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState();

  const theme = isDarkTheme ? appTheme : { ...appTheme, ...lightTheme };
  const muiTheme = createMuiTheme(theme);

  useEffect(() => {
    const preferedTheme = window.localStorage.getItem('dq::theme');
    if (preferedTheme === null || preferedTheme === 'dark') {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = isDarkTheme ? 'dark' : 'light';

    const metaTheme = document.head.querySelector('meta[name=theme-color]');
    metaTheme.content = theme.palette.primary.main;
  }, [isDarkTheme, theme]);

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme);
    window.localStorage.setItem('dq::theme', isDarkTheme ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={[isDarkTheme, toggleTheme]}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProvider };
