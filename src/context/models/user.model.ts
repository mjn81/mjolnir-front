export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
  usage: {
    limit: string;
    used: string;
  };
}

export interface IUserState {
  loggedin: boolean;
  token: string;
  user: IUser;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}
