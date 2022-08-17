import React, { PropsWithChildren } from 'react';
import {
  CssBaseline,
  Container,
} from '@mui/material';

export const AuthLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <Container
      component="main"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      {children}
    </Container>
  );
};
