import { IUser } from '../models/user-model';

class UserDto implements Pick<IUser, 'name' | 'email'> {
  name: string;

  email: string;

  constructor(model: IUser) {
    this.name = model.name;
    this.email = model.email;
  }
}

export default UserDto;
