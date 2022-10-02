import React from 'react';
import { RouteManager } from 'pages';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from 'react-query';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
const queryClient = new QueryClient();
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // put all context providers here
  return (
    <QueryClientProvider client={queryClient}>
      <RouteManager />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
