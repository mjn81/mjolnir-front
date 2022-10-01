import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export type DropdownItemType = {
  label: string;
  value: string;
  icon?: any;
  onClick?: () => void;
  style?: string;
};

export const ACTION_DROPDOWN: DropdownItemType[] =
  [
    {
      label: 'Delete',
      value: 'delete',
      style: 'text-error',
      icon: faTrashCan,
    },
  ];
