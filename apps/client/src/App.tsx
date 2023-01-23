import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
// import useAuth from './hooks/useAuth';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';
import { IUser } from './types/UserTypes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

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
