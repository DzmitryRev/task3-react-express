import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  status: 'blocked' | 'active';
  registrationDate: Date;
  lastVisitDate: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  lastVisitDate: { type: Date, required: true },
});

export default model('User', UserSchema);
