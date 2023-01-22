import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { signUpValidationSchema as validationSchema } from '../yup/Schemas';
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import useRequestFlags from '../hooks/useRequestFlags';
import globalStyles from '../styles/global';

const formikInitialValue = {
  name: '',
  email: '',
  password: '',
};

function SignupPage() {
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
      const { name, email, password } = values;
      setError('');
      AuthService.signup(name, email, password)
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
          <Link to="/signin">Войти</Link>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="outlined-error"
            name="name"
            label={formik.touched.name ? formik.touched.name && formik.errors.name : 'Name'}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            autoComplete="off"
          />
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
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            autoComplete="off"
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignupPage;
