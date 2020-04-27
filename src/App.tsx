import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styling/theme';
import Designer from './components/Templates/Designer';
import { GlobalStyles } from './styling/GlobalStyles';

console.log(process.env);
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Designer />
    </ThemeProvider>
  );
}

export default App;
