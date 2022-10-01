import React from 'react';
import { RouteManager } from 'pages';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from 'react-query';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

const App = () => {
  // put all context providers here
  return (
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <RouteManager />
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;
