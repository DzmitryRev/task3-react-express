import { createContext } from 'react';
import { IUser } from '../types/UserTypes';

const AuthContext = createContext<{
  isAuth: boolean;
  user: IUser | null;
  setIsAuth:(value: boolean) => void;
  setUser: (value: IUser | null) => void;
}>({
      isAuth: false,
      user: null,
      setIsAuth: (value: boolean) => {},
      setUser: (value: IUser | null) => {},
    });

export default AuthContext;
