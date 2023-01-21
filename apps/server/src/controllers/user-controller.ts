import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IUserDto } from '../dtos/user-dto';
import { IUser } from '../models/user-model';
import userService from '../services/user-service';
import ApiError from '../utils/api-error-util';

interface ICurrentUser {
  user: IUserDto;
  accessToken: string;
  refreshToken: string;
}

interface ItoggleBlockUserProps extends Pick<IUser, 'status'> {
  id: string;
}

class UserController {
  async signup(
    req: Request<{}, {}, Pick<IUser, 'name' | 'email' | 'password'>>,
    res: Response<ICurrentUser>,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { name, email, password } = req.body;
      const userData: ICurrentUser = await userService.signup(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signin(
    req: Request<{}, {}, Pick<IUser, 'name' | 'email' | 'password'>>,
    res: Response<ICurrentUser>,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const userData: ICurrentUser = await userService.signin(email, password);
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

  async deleteUser(
    req: Request<{}, {}, Pick<IUserDto, 'id'>>,
    res: Response<IUserDto>,
    next: NextFunction,
  ) {
    try {
      const { id } = req.body;
      const deletedUser = await userService.deleteUser(id);
      return res.json(deletedUser);
    } catch (e) {
      next(e);
    }
  }

  async toggleBlockUser(
    req: Request<{}, {}, ItoggleBlockUserProps>,
    res: Response<IUserDto>,
    next: NextFunction,
  ) {
    try {
      const { id, status } = req.body;
      if (status === 'active' || status === 'blocked') {
        const updatedUser = await userService.toggleBlockUser(id, status);
        return res.json(updatedUser);
      }
      throw ApiError.BadRequest('Wrong status paramert');
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
