import axios from 'axios';
import api, { URL } from '../fetch';
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

  static refresh() {
    return axios.get<IAuthRes>(`${URL}/refresh`, { withCredentials: true });
  }
}

export default AuthService;
