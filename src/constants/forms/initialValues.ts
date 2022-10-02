export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const REGISTER_INITIAL_VALUES = {
  email: '',
  password: '',
  fullName: '',
  userName: '',
};

export const CREATE_CATEGORY_INITIAL_VALUES = {
  name: '',
  color: '',
};

export const UPLOAD_FILE_INITIAL_VALUES = {
  name: '',
  file: null,
  category: [],
};

export const CREATE_FOLDER_INITIAL_VALUES = (
  parent: string,
) => ({
  name: '',
  parent: parent,
});
