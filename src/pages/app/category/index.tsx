import React from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import {
  deleteCategory,
  getCategories,
} from 'api';
import {
  Button,
  CreateCategoryForm,
  Modal,
  TableGenerator,
} from 'components';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
} from 'constants/index';
import useModal from 'hooks/useModal';

const Categories = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const { isOpen, closeModal, openModal } =
    useModal();
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
    <section>
      <section className="flex mb-2 justify-between items-center">
        <h3 className="text-2xl font-medium">
          Categories
        </h3>
        <Button
          className="text-base capitalize"
          onClick={() => openModal()}
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="mr-2"
          />
          <p>create</p>
        </Button>
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
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="w-full space-y-2">
          <h2 className="capitalize font-semibold text-xl">
            create category
          </h2>
          <CreateCategoryForm />
        </div>
      </Modal>
    </section>
  );
};

export default Categories;
