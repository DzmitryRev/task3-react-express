import jwt from 'jsonwebtoken';
import { IUserDto } from '../dtos/user-dto';
import tokenModel from '../models/token-model';

class TokenService {
  static generateTokens(payload: IUserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  static async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  static async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export default TokenService;
