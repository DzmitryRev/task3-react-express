import bcrypt from 'bcrypt';
import ApiError from '../utils/api-error-util';

class HashService {
  async compareHash(userPassword: string, passwordFromReq: string): Promise<void> {
    const isPassEquals = await bcrypt.compare(passwordFromReq, userPassword);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 5);
    return hashPassword;
  }
}

export default new HashService();
