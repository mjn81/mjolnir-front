import { Upload } from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  deleteCategory,
  getCategories,
} from 'api';
import { TableGenerator } from 'components';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
} from 'constants/index';
import { useSnackbar } from 'notistack';
import React from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

const Drive = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const { data, isLoading, refetch } = useQuery(
    'getCategories',
    getCategories,
  );

  const { mutateAsync } = useMutation(
    'deleteCategory',
    deleteCategory,
    {
      onSuccess: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.SUCCESS,
        });
      },
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
      },
    },
  );
  return (
    <div>
      <Box
        display="flex"
        marginBottom={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" component="p">
          Drive
        </Typography>
        <Link to="upload">
          <Button
            variant="contained"
            startIcon={<Upload />}
          >
            <Typography
              variant="subtitle1"
              textTransform="capitalize"
            >
              Upload File
            </Typography>
          </Button>
        </Link>
      </Box>
      {!isLoading}
    </div>
  );
};

export default Drive;
