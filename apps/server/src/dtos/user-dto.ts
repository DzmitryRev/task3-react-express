import { IUser } from '../models/user-model';

export interface IUserDto extends Pick<IUser, 'name' | 'email'> {
  id: string;
}

class UserDto implements IUserDto {
  name: string;

  id: string;

  email: string;

  constructor(model: IUserDto) {
    this.name = model.name;
    this.email = model.email;
    this.id = model.id;
  }
}

export default UserDto;
