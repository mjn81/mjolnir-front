import { Upload } from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { getDrive } from 'api';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
} from 'constants/index';
import { useSnackbar } from 'notistack';
import React, {
  useEffect,
  useState,
} from 'react';
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
  const [id, setId] = useState();
  const { data, refetch } = useQuery(
    'getDrive',
    () => getDrive(id),
  );
  console.log(data);
  useEffect(() => {
    refetch();
  }, [id]);
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
    </div>
  );
};

export default Drive;
