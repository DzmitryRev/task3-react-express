import { Request, Response } from 'express';
import { IUserDto } from '../../dtos/user-dto';
import { IUser } from '../../models/user-model';

export type ISignupReq = Request<{}, {}, Pick<IUser, 'name' | 'email' | 'password'>>;

export type ISignupRes = Response<{
  user: IUserDto;
  accessToken: string;
  refreshToken: string;
}>;

export type ISigninReq = Request<{}, {}, Pick<IUser, 'email' | 'password'>>;

export type ISigninRes = ISignupRes;

export type IDeleteUserReq = Request<{}, {}, string[]>;

export type IDeleteUserRes = Response<string[]>;

export type IToggleBlockUserReq = Request<{}, {}, { ids: string[], status: 'blocked' | 'active' }>;

export type IToggleBlockUserRes = Response<string[]>;
