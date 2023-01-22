import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { URL } from './fetch';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';
import AuthService from './services/AuthService';
import { IAuthRes } from './types/AuthResTypes';
import { IUser } from './types/UserTypes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<IAuthRes>(`${URL}/refresh`, { withCredentials: true }).then((res) => {
      setIsAuth(true);
      setUser(res.data.user);
    }).catch(() => {
      navigate('/signin');
    });
  }, []);

  const authContextProviderValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      user,
      setUser,
    }),
    [isAuth, setIsAuth, user, setUser],
  );
  return (
    <div className="App">
      <header>
        {user && user.email}
        {isAuth && (
          <button
            type="button"
            onClick={() => {
              AuthService.signout().then(() => {
                setIsAuth(false);
                setUser(null);
                localStorage.removeItem('token');
              });
            }}
          >
            Выйти
          </button>
        )}
      </header>
      <AuthContext.Provider value={authContextProviderValue}>
        <Routes>
          <Route index path="/" element={<UsersPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
