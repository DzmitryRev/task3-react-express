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
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
  registrationDate: { type: Date, required: true, default: new Date() },
  lastVisitDate: { type: Date, default: null },
});

export default model('User', UserSchema);
