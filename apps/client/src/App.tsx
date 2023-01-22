import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
// import useAuth from './hooks/useAuth';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';
import AuthService from './services/AuthService';
import { IUser } from './types/UserTypes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const authContextProviderValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      user,
      setUser,
    }),
    [isAuth, setIsAuth, user, setUser],
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      AuthService.refresh()
        .then((res) => {
          localStorage.setItem('token', res.data.accessToken);
          setIsAuth(true);
          setUser(res.data.user);
          navigate('/');
        })
        .catch((e) => {
          console.log(e.response?.data?.message);
        });
    }
  }, []);

  console.log(isAuth);

  return (
    <div className="App">
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
