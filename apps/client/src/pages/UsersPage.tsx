import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../fetch';
import { IUser } from '../types/UserTypes';

interface IUserPageProps {
  isAuth: boolean;
}

export default function UsersPage({ isAuth }: IUserPageProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selected];

  const navigate = useNavigate();

  if (!isAuth) {
    navigate('/signin');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await api.get<IUser[]>(`${URL}/users`);
        setUsers(res.data);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);
  return <div>UsersPage</div>;
}
