import {
  Box,
  Button,
  List,
  ListItem,
  MenuList,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box>
      <List>
        <ListItem>
          <Button variant="contained">
            <Link to="/auth/login">Login</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Link to="/auth/register">
            Register
          </Link>
        </ListItem>
      </List>
      LandingPage
    </Box>
  );
};

export default LandingPage;
