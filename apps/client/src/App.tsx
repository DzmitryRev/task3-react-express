import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<UsersPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
}

export default App;
