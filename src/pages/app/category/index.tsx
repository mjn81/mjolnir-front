import React, { useState } from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGears,
  faSquarePlus,
  faTags,
} from '@fortawesome/free-solid-svg-icons';

import {
  deleteCategory,
  getCategories,
} from 'api';
import {
  Button,
  CreateCategoryForm,
  DropdownButton,
  EditCategoryForm,
  Modal,
  SearchInput,
  TableGenerator,
  TextInput,
} from 'components';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
} from 'constants/index';
import useModal from 'hooks/useModal';
import { ACTION_DROPDOWN } from 'constants/dropdown';

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

  const handleCloseModal = () => {
    closeModal();
    refetch();
  };
  const handleEditCloseModal = () => {
    editClose();
    refetch();
  };
  return (
    <section>
      <header className="space-y-3 mb-4">
        <h3 className="text-2xl font-medium space-x-2">
          <FontAwesomeIcon icon={faTags} />
          <span>Tags</span>
        </h3>
        <section className="flex items-center justify-between">
          <SearchInput />
          <div className="space-x-2">
            <DropdownButton
              options={ACTION_DROPDOWN}
            >
              <FontAwesomeIcon icon={faGears} />
              <p>action</p>
            </DropdownButton>
            <Button onClick={() => openModal()}>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="mr-2"
              />
              create
            </Button>
          </div>
        </section>
      </header>
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
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <div className="w-full space-y-3">
          <h2 className="capitalize font-semibold text-xl">
            create tag
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
            edit tag
          </h2>
          {!!editId && (
            <EditCategoryForm
              id={editId}
              onClose={handleEditCloseModal}
            />
          )}
        </div>
      </Modal>
    </section>
  );
};

export default Categories;
