import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styling/theme';
import Designer from './components/Templates/Designer';
import { GlobalStyles } from './styling/GlobalStyles';
import { createBrowserHistory } from 'history';
import './styling/typography';
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './styling/typography';

export const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <GlobalStyles />
      <Designer />
    </ThemeProvider>
  );
}

export default App;
