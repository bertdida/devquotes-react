import React from "react";

import { ThemeProvider } from "./components/Theme";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Feed />
    </ThemeProvider>
  );
}

export default App;
