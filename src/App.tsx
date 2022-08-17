import React from 'react';
import { RouteManager } from 'pages';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';

const theme = createTheme();

const App = () => {
  // put all context providers here
  return (
    <ThemeProvider theme={theme}>
      <RouteManager />
    </ThemeProvider>
  );
};

export default App;
