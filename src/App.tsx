import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { lightTheme } from "./styles/themes/lightTheme";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { CycleProvider } from "./contexts/CyclesContext";
import { useState } from "react";

export function App() {
  const [theme, setTheme] = useState(defaultTheme);

  function toggleTheme() {
    setTheme(theme.title === "default" ? lightTheme : defaultTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CycleProvider>
        <GlobalStyle />
        {/* <button onClick={toggleTheme}>Toggle theme</button> */}
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CycleProvider>
    </ThemeProvider>
  );
}
