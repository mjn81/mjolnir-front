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
import { Provider } from 'react-redux';
import { store } from 'context';

const theme = createTheme();
const queryClient = new QueryClient();

const App = () => {
  // put all context providers here
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RouteManager />
          </ThemeProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
