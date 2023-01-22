import UserDto from '../dtos/user-dto';
import UserModel from '../models/user-model';
import ApiError from '../utils/api-error-util';
import hashService from './hash-service';
import TokenService from './token-service';

class UserService {
  async signup(name: string, email: string, password: string) {
    const newUser = await UserModel.findOne({ email });
    if (newUser) throw ApiError.BadRequest('Такой email уже зарегистрирован');
    const hashPassword = await hashService.hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashPassword });
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
    await hashService.compareHash(user.password, password);
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
    const users = await UserModel.find({}, { password: 0 });
    return users;
  }

  async deleteUsers(ids: string[]) {
    await UserModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async toggleBlockUsers(ids: string[], status: 'blocked' | 'active') {
    await UserModel.updateMany({ _id: { $in: ids } }, { $set: { status } });
    return ids;
  }

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

export default new UserService();
