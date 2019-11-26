import React, { createContext } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const defaultTheme = {
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightRegular: 500,
    fontWeightLight: 500,
    fontWeightMedium: 700
  },
  palette: {
    type: "dark",
    primary: {
      main: "#333"
    },
    background: {
      paper: "#333",
      default: "#121212"
    }
  }
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const theme = createMuiTheme(defaultTheme);

  return (
    <ThemeContext.Provider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
