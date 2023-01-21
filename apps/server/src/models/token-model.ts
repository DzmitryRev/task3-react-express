import { Schema, model } from 'mongoose';
import { IUser } from './user-model';

export interface IToken {
  user: Schema<IUser>;
  refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
  user: { ref: 'User' },
  refreshToken: { required: true },
});

export default model('Token', TokenSchema);
