import React, { useContext, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signInValidationSchema as validationSchema } from '../yup/Schemas';
import useRequestFlags from '../hooks/useRequestFlags';
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import globalStyles from '../styles/global';

const formikInitialValue = {
  email: '',
  password: '',
};

export default function SigninPage() {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const { error, setError } = useRequestFlags();

  const formik = useFormik({
    initialValues: formikInitialValue,
    validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      setError('');
      AuthService.signin(email, password)
        .then((res) => {
          localStorage.setItem('token', res.data.accessToken);
          setUser(res.data.user);
          setIsAuth(true);
        })
        .catch((e) => {
          setError(e.response.data.message);
        });
    },
  });

  return (
    <Box sx={globalStyles.auth}>
      <Box sx={globalStyles.authInnerContainer}>
        <Box sx={globalStyles.authError}>{error}</Box>
        <Box sx={{ mb: 4 }}>
          <Link to="/signup">Регистрация</Link>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="outlined-error"
            name="email"
            label={formik.touched.email ? formik.touched.email && formik.errors.email : 'Email'}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            autoComplete="off"
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="outlined-error"
            name="password"
            label={
              formik.touched.password
                ? formik.touched.password && formik.errors.password
                : 'Password'
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            autoComplete="off"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
