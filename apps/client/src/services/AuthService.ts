import api from '../fetch';
import { IAuthRes } from '../types/AuthResTypes';

class AuthService {
  static signup(name: string, email: string, password: string) {
    return api.post<IAuthRes>('/signup', { name, email, password });
  }

  static signin(email: string, password: string) {
    return api.post<IAuthRes>('/signin', { email, password });
  }

  static signout() {
    return api.post('/signout');
  }
}

export default AuthService;
