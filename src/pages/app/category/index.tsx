import React from 'react';
import { TableGenerator } from 'components';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
} from 'constants/index';
import {
  useMutation,
  useQuery,
} from 'react-query';
import {
  deleteCategory,
  getCategories,
} from 'api';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Categories = () => {
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
        marginBottom={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" component="p">
          Categories
        </Typography>
        <Link to="create">
          <Button variant="contained">
            <Typography
              variant="h6"
              textTransform="capitalize"
            >
              create category
            </Typography>
          </Button>
        </Link>
      </Box>
      {!isLoading && (
        <TableGenerator
          columns={CATEGORY_COLUMNS}
          data={data.categories}
          onEdit={(id) => {
            navigation(`edit/${id}`);
          }}
          onDelete={(id) => {
            mutateAsync(id).then(() => refetch());
          }}
        />
      )}
    </div>
  );
};

export default Categories;
