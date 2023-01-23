import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import AuthContext from '../context/AuthContext';
import api, { URL } from '../fetch';
import { IUser, StatusType } from '../types/UserTypes';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';
import globalStyles from '../styles/global';
import useRedirect from '../hooks/useRedirect';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'registrationDate', headerName: 'Registation Date', width: 170 },
  {
    field: 'lastVisitDate',
    headerName: 'Last visit Date',
    width: 170,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
];

export default function UsersPage() {
  const {
    isAuth, user, setIsAuth, setUser,
  } = useContext(AuthContext);

  useRedirect(!isAuth, '/signin');

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const loadUsers = () => {
    api
      .get<IUser[]>(`${URL}/users`)
      .then((res) => {
        setUsers(res.data);
        const currentUser = res.data.find((item) => item.email === user?.email);
        if (user && (!currentUser || currentUser.status === 'blocked')) {
          setIsAuth(false);
          setUser(null);
        }
      })
      .catch(() => {});
  };

  const deleteUsers = () => {
    UsersService.deleteUsers(selectedUsers).then(() => {
      loadUsers();
    });
  };

  const toggleBlockUsers = (status: StatusType) => {
    UsersService.toggleBlockUsers(selectedUsers, status).then(() => {
      loadUsers();
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <Box sx={globalStyles.usersPageContainer}>
        {user && user.email}
        {isAuth && (
          <Button
            color="error"
            variant="contained"
            type="button"
            onClick={() => {
              AuthService.signout().then(() => {
                localStorage.removeItem('token');
                setIsAuth(false);
                setUser(null);
              });
            }}
          >
            Выход
          </Button>
        )}
      </Box>
      <Box sx={{ mb: 1 }}>
        <Button
          sx={{ mx: 1 }}
          color="error"
          variant="contained"
          type="button"
          disabled={!selectedUsers.length}
          onClick={deleteUsers}
        >
          удалить
        </Button>

        <Button
          sx={{ mx: 1 }}
          color="error"
          variant="contained"
          type="button"
          disabled={!selectedUsers.length}
          onClick={() => {
            toggleBlockUsers('blocked');
          }}
        >
          заблокировать
        </Button>

        <Button
          sx={{ mx: 1 }}
          color="primary"
          variant="contained"
          type="button"
          disabled={!selectedUsers.length}
          onClick={() => {
            toggleBlockUsers('active');
          }}
        >
          разблокировать
        </Button>
      </Box>

      <Box sx={globalStyles.usersDataGridContainer}>
        <DataGrid
          sx={{ mx: 'auto' }}
          getRowId={(row) => row._id}
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            setSelectedUsers(ids.map((id) => id.toString()));
          }}
        />
      </Box>
    </div>
  );
}
