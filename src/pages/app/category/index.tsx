import React from 'react';
import {
  ButtonLink,
  TableGenerator,
} from 'components';
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
  Link,
  useNavigate,
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

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
  console.log(data);
  return (
    <section className="">
      <section className="flex mb-2 justify-between items-center">
        <h3 className="text-2xl font-medium">
          Categories
        </h3>
        <ButtonLink
          path="create"
          className="text-base "
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="mr-2"
          />
          <p>create</p>
        </ButtonLink>
      </section>
      {!isLoading && (
        <TableGenerator
          counter
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
    </section>
  );
};

export default Categories;
