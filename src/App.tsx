import React from 'react';
import { RouteManager } from 'pages';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  QueryClientProvider,
  QueryClient,
} from 'react-query';
import { SnackbarProvider } from 'notistack';

const theme = createTheme();
const queryClient = new QueryClient();

const App = () => {
  // put all context providers here
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouteManager />
        </ThemeProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
