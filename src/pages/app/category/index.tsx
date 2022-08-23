import React from 'react';
import { TableGenerator } from 'components';
import { CATEGORY_COLUMNS } from 'constants/index';
import { useQuery } from 'react-query';
import { getCategories } from 'api';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigation = useNavigate();
  const { data, isLoading } = useQuery(
    'getCategories',
    getCategories,
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
            console.log(id);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
