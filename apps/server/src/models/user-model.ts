import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  status: 'blocked' | 'active';
  registrationDate: string;
  lastVisitDate: string | null;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
  registrationDate: { type: String, required: true, default: new Date().toLocaleString('en-US') },
  lastVisitDate: { type: String, default: new Date().toLocaleString('en-US') },
});

export default model('User', UserSchema);
