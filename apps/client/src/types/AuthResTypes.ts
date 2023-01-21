import { IUser } from './UserTypes';

export interface IAuthRes {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
