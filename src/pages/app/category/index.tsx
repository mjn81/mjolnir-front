import React, { useState } from 'react';
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
  EditCategoryForm,
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
  const [editId, setEditId] =
    useState<string>('');
  const { isOpen, closeModal, openModal } =
    useModal();
  const {
    isOpen: editIsOpen,
    closeModal: editClose,
    openModal: editOpen,
  } = useModal();
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
            setEditId(id);
            editOpen();
          }}
          onDelete={(id) => {
            mutateAsync(id).then(() => refetch());
          }}
        />
      )}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="w-full space-y-3">
          <h2 className="capitalize font-semibold text-xl">
            create category
          </h2>
          <CreateCategoryForm />
        </div>
      </Modal>
      <Modal
        isOpen={editIsOpen}
        onClose={() => {
          editClose();
          setEditId('');
        }}
      >
        <div className="w-full space-y-3">
          <h2 className="capitalize font-semibold text-xl">
            edit category
          </h2>
          {!!editId && (
            <EditCategoryForm id={editId} />
          )}
        </div>
      </Modal>
    </section>
  );
};

export default Categories;
