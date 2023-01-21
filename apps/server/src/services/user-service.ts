import bcrypt from 'bcrypt';
import UserDto from '../dtos/user-dto';
import UserModel, { IUser } from '../models/user-model';
import ApiError from '../utils/api-error-util';
import TokenService from './token-service';

class UserService {
  async signup(name: string, email: string, password: string) {
    const newUser = await UserModel.findOne({ email });
    if (newUser) {
      throw ApiError.BadRequest('Такой email уже зарегистрирован');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      registrationDate: new Date(),
    });
    const userDto = new UserDto({ name: user.name, email: user.email, id: user._id.toString() });
    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async signin(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto({ name: user.name, email: user.email, id: user._id.toString() });
    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async signout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async deleteUser(id: string) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя нет');
    }
    await UserModel.deleteOne({ _id: id });
    const userDto = new UserDto({ name: user.name, email: user.email, id: user._id.toString() });
    return { user: userDto };
  }

  async toggleBlockUser(id: string, status: Pick<IUser, 'status'>) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя нет');
    }
    await UserModel.updateOne({ _id: id }, { $set: { status } });
    const userDto = new UserDto({ name: user.name, email: user.email, id: user._id.toString() });
    return { user: userDto };
  }

  //   async toggleBlockAllPickedUsers(id: string, status: Pick<IUser, 'status'>) {
  //     const user = await UserModel.findOne({ _id: id });
  //     if (!user) {
  //       throw ApiError.BadRequest('Такого пользователя нет');
  //     }
  //     await UserModel.updateAll({ _id: id }, { $set: { status } });
  //     const userDto = new UserDto({ name: user.name, email:
  // user.email, id: user._id.toString() });
  //     return { user: userDto };
  //   }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(tokenFromDb.user);
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя нет');
    }
    const userDto = new UserDto({ name: user.name, email: user.email, id: user._id.toString() });
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default UserService;
