import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user-service';
import ApiError from '../utils/api-error-util';
import {
  IDeleteUserReq,
  IDeleteUserRes,
  ISigninReq,
  ISigninRes,
  ISignupReq,
  ISignupRes,
  IToggleBlockUserReq,
  IToggleBlockUserRes,
} from './types/user-controller-types';

class UserController {
  async signup(req: ISignupReq, res: ISignupRes, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { name, email, password } = req.body;
      const userData = await userService.signup(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signin(req: ISigninReq, res: ISigninRes, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signin(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.signout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async deleteUsers(req: IDeleteUserReq, res: IDeleteUserRes, next: NextFunction) {
    try {
      const ids = req.body;
      const deletedUser = await userService.deleteUsers(ids);
      return res.json(deletedUser);
    } catch (e) {
      next(e);
    }
  }

  async toggleBlockUsers(req: IToggleBlockUserReq, res: IToggleBlockUserRes, next: NextFunction) {
    try {
      const { ids, status } = req.body;
      if (status === 'active' || status === 'blocked') {
        const updatedUser = await userService.toggleBlockUsers(ids, status);
        return res.json(updatedUser);
      }
      throw ApiError.BadRequest('Wrong status paramert');
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
