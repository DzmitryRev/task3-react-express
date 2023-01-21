import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  status: 'blocked' | 'active';
  registrationDate: Date;
  lastVisitDate: Date | null;
}

const UserSchema = new Schema<IUser>({
  name: { required: true },
  email: { unique: true, required: true },
  password: { required: true },
  status: { required: true },
  registrationDate: { required: true },
  lastVisitDate: { default: null },
});

export default model('User', UserSchema);
