import { Token } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from '@mui/material';
import { getDistToken } from 'api';
import { ALERT_TYPES } from 'constants/index';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const handleGetToken = () => {
    getDistToken().then(({ token, message }) => {
      setToken(token);
      enqueueSnackbar(message, {
        variant: ALERT_TYPES.SUCCESS,
      });
    });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
    >
      <List component={Paper}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Token />
            </ListItemIcon>
            <Typography
              variant="body2"
              textTransform="capitalize"
            >
              distributor token
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Card
        sx={{
          width: 600,
          marginX: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            component="h4"
          >
            get Distributor Token
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleGetToken}
          >
            get token
          </Button>
          <Box
            sx={{
              marginY: 3,
              backgroundColor: 'lightgray',
              width: '100%',
              borderRadius: 2,
              paddingX: 2,
              overflowX: 'scroll',
              overflowY: 'hidden',
            }}
          >
            <Typography
              component="span"
              variant="subtitle1"
              whiteSpace="nowrap"
              width="100%"
            >
              {token}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
