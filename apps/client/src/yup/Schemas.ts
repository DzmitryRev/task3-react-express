import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(1, 'Password should be of minimum 1 characters length')
    .required('Password is required'),
});

export const SignInvalidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(1, 'Password should be of minimum 1 characters length')
    .required('Password is required'),
});
