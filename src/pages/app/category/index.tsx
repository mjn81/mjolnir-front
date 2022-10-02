import React, { useState } from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
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
  ModalFormCard,
  TableGenerator,
} from 'components';
import {
  ALERT_TYPES,
  CATEGORY_COLUMNS,
  ACTION_DROPDOWN,
} from 'constants/index';
import useModal from 'hooks/useModal';
import { PageLayout } from 'layouts';
import { toast } from 'react-toastify';

const Categories = () => {
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
        toast.success(message);
      },
      onError: ({ message }) => {
        toast.error(message);
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
    <PageLayout
      title="Tags"
      icon={faTags}
      actions={
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
      }
    >
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
        <ModalFormCard title="create tag">
          <CreateCategoryForm />
        </ModalFormCard>
      </Modal>
      <Modal
        isOpen={editIsOpen}
        onClose={() => {
          editClose();
          setEditId('');
        }}
      >
        <ModalFormCard title="edit tag">
          {!!editId && (
            <EditCategoryForm
              id={editId}
              onClose={handleEditCloseModal}
            />
          )}
        </ModalFormCard>
      </Modal>
    </PageLayout>
  );
};

export default Categories;
