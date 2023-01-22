import api from '../fetch';

class UsersService {
  static deleteUsers(usersIds: string[]) {
    return api.post<string[]>('/users/delete', usersIds);
  }

  static toggleBlockUsers(ids: string[], status: 'active' | 'blocked') {
    return api.put<string[]>('/users/block', { ids, status });
  }
}

export default UsersService;
