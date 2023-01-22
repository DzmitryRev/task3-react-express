import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { signInValidationSchema as validationSchema } from '../yup/Schemas';
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import globalStyles from '../styles/global';
import useRedirect from '../hooks/useRedirect';
import { signInInitialvalue } from '../formik/initialValues';
import TextFieldCustom from '../components/TextFieldCustom';

export default function SigninPage() {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext);

  useRedirect(isAuth, '/');

  const formik = useFormik({
    initialValues: signInInitialvalue,
    validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      AuthService.signin(email, password)
        .then((res) => {
          localStorage.setItem('token', res.data.accessToken);
          setUser(res.data.user);
          setIsAuth(true);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          // error handling
        });
    },
  });

  return (
    <Box sx={globalStyles.auth}>
      <Box sx={globalStyles.authInnerContainer}>
        <Box sx={{ mb: 4 }}>
          <Link to="/signup">Регистрация</Link>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextFieldCustom
            name="email"
            label={formik.touched.email ? formik.touched.email && formik.errors.email : 'Email'}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
          />
          <TextFieldCustom
            name="password"
            label={
              formik.touched.password
                ? formik.touched.password && formik.errors.password
                : 'Password'
            }
            type="password"
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={formik.handleChange}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Вход
          </Button>
        </form>
      </Box>
    </Box>
  );
}
