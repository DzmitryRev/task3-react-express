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

export type IDeleteUserReq = Request<{}, {}, Pick<IUserDto, 'id'>>;

export type IDeleteUserRes = Response<IUserDto>;

export type IToggleBlockUserReq = Request<{}, {}, Pick<IUser, 'status'> & Pick<IUserDto, 'id'>>;

export type IToggleBlockUserRes = IDeleteUserRes;
