import React, { createContext, useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { teal, deepPurple } from "@material-ui/core/colors";

const darkTheme = {
  palette: {
    type: "dark",
    primary: {
      main: "#333"
    },
    secondary: {
      main: teal.A400
    },
    background: {
      paper: "#333",
      default: "#292929"
    }
  }
};

const lightTheme = {
  palette: {
    type: "light",
    primary: {
      main: "#fff"
    },
    secondary: {
      main: deepPurple.A200
    },
    background: {
      default: "#f5f5f5"
    }
  }
};

const defaultTheme = {
  breakpoints: {
    values: {
      md: 800
    }
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightRegular: 500,
    fontWeightLight: 500,
    fontWeightMedium: 700
  },
  ...darkTheme
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const preferedTheme = window.localStorage.getItem("dq::theme");
  const [isDarkTheme, setIsDarkTheme] = useState(
    preferedTheme === null
      ? true // default
      : ["dark", "light"].includes(preferedTheme)
      ? preferedTheme === "dark"
      : true
  );

  const theme = isDarkTheme ? defaultTheme : { ...defaultTheme, ...lightTheme };
  const muiTheme = createMuiTheme(theme);

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme);
    window.localStorage.setItem("dq::theme", isDarkTheme ? "light" : "dark");
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

export { ThemeContext, ThemeProvider };
