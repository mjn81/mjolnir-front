import { IUser } from 'context';

export const mapUserToState = (data: any) => {
  const { user } = data;
  const userState: IUser = {
    id: user.id,
    name: user.fullName,
    email: user.email,
    username: user.userName,
    usage: user.usage,
    role: user.role,
  };
  return userState;
};
